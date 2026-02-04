import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/shared/api/axios";
import "@/features/posts/styles/PostList.css";
import { useUI } from "@/shared/ui/uiStore";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export default function PostListPage() {
  const nav = useNavigate();
  const ui = useUI();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {

        if (!err.response) { ui.toast("서버에 연결할 수 없습니다.");
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
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return String(isoString);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  };

  return (
    <div className="postlist-container">
      <div className="postlist-header">
        <h2>게시글</h2>
        <button className="btn primary" onClick={() => nav("/posts/new")}>
          글쓰기
        </button>
      </div>

      {posts.length === 0 && (
        <div className="empty">아직 게시글이 없습니다.</div>
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
    </div>
  );
}
