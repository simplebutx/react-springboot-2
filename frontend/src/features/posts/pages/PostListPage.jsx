import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "@/shared/api/axios";
import "@/features/posts/styles/PostList.css";
import { useUI } from "@/shared/ui/uiStore";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export default function PostListPage() {
  const nav = useNavigate();
  const ui = useUI();

  const [searchParams, setSearchParams] = useSearchParams();

  // URL 쿼리에서 page/keyword 읽기
  const pageParam = Number(searchParams.get("page") ?? "0");
  const page = Number.isFinite(pageParam) && pageParam >= 0 ? pageParam : 0;

  const keyword = (searchParams.get("keyword") ?? "").trim();
  const size = 10;

  // 입력창은 별도 state로 (타이핑 중 바로 검색되지 않게)
  const [keywordInput, setKeywordInput] = useState(keyword);

  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // URL keyword가 바뀌면 입력창도 동기화
  useEffect(() => {
    setKeywordInput(keyword);
  }, [keyword]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const params = { page, size };
        if (keyword) params.keyword = keyword; // keyword 있으면만 포함

        const res = await api.get("/posts", { params });

        const data = res.data;
        setPosts(Array.isArray(data?.items) ? data.items : []);
        setTotalPages(Number.isFinite(data?.totalPages) ? data.totalPages : 0);
      } catch (err) {
        if (!err.response) {
          ui.toast("서버에 연결할 수 없습니다.");
          return;
        }
        if (err.response.status >= 500) {
          ui.toast("서버 오류가 발생했습니다.");
          return;
        }
        ui.toast(getErrorMessage(err, "목록 조회 실패"));
      }
    };

    fetchPosts();
  }, [page, keyword]);

  const formatDate = (value) => {
    if (!value) return "-";

    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");

    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  };

  const goPage = (nextPage) => {
    const safe = Math.max(0, Math.min(nextPage, Math.max(totalPages - 1, 0)));
    setSearchParams((prev) => {
      const sp = new URLSearchParams(prev);
      sp.set("page", String(safe));
      if (keyword) sp.set("keyword", keyword);
      else sp.delete("keyword");
      return sp;
    });
  };

  const onSearch = () => {
    const nextKeyword = keywordInput.trim();
    setSearchParams((prev) => {
      const sp = new URLSearchParams(prev);
      sp.set("page", "0"); // 검색하면 0페이지로
      if (nextKeyword) sp.set("keyword", nextKeyword);
      else sp.delete("keyword");
      return sp;
    });
  };

  const onClear = () => {
    setKeywordInput("");
    setSearchParams((prev) => {
      const sp = new URLSearchParams(prev);
      sp.set("page", "0");
      sp.delete("keyword");
      return sp;
    });
  };

  const pageNumbers = useMemo(() => {
    if (!totalPages) return [];
    const start = Math.max(0, page - 2);
    const end = Math.min(totalPages - 1, page + 2);
    const nums = [];
    for (let i = start; i <= end; i++) nums.push(i);
    return nums;
  }, [page, totalPages]);

  return (
    <div className="postlist-container">
      <div className="postlist-header">
        <h2>게시글</h2>

        <div className="postlist-actions">
          {/* 검색창 */}
          <div className="searchbar">
            <input
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearch();
              }}
              placeholder="제목/내용 검색"
            />
            <button className="btn primary" type="button" onClick={onSearch}>
              검색
            </button>
          </div>

          <button className="btn primary" onClick={() => nav("/posts/new")}>
            글쓰기
          </button>
        </div>
      </div>

      {posts.length === 0 && (
        <div className="empty">
          {keyword ? `“${keyword}” 검색 결과가 없습니다.` : "아직 게시글이 없습니다."}
        </div>
      )}

      <div className="postlist-card">
        <div className="postlist-row head">
          <div className="col title">제목</div>
          <div className="col author">작성자</div>
          <div className="col date">작성일</div>
        </div>

        {posts.map((p) => (
          <button
            key={p.id}
            className="postlist-row item"
            onClick={() => nav(`/posts/${p.id}`)}
            type="button"
          >
            <div className="col title">{p.title}</div>
            <div className="col author">{p.authorName ?? "-"}</div>
            <div className="col date">{formatDate(p.createdAt)}</div>
          </button>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          className="btn ghost"
          onClick={() => goPage(0)}
          disabled={page === 0 || totalPages === 0}
          type="button"
        >
          처음
        </button>

        <button
          className="btn ghost"
          onClick={() => goPage(page - 1)}
          disabled={page === 0 || totalPages === 0}
          type="button"
        >
          이전
        </button>

        {pageNumbers.map((n) => (
          <button
            key={n}
            type="button"
            className={`btn page ${n === page ? "active" : ""}`}
            onClick={() => goPage(n)}
          >
            {n + 1}
          </button>
        ))}

        <button
          className="btn ghost"
          onClick={() => goPage(page + 1)}
          disabled={totalPages === 0 || page >= totalPages - 1}
          type="button"
        >
          다음
        </button>

        <button
          className="btn ghost"
          onClick={() => goPage(totalPages - 1)}
          disabled={totalPages === 0 || page >= totalPages - 1}
          type="button"
        >
          마지막
        </button>

        <span className="page-info">
          {totalPages === 0 ? "0 / 0" : `${page + 1} / ${totalPages}`}
        </span>
      </div>
    </div>
  );
}
