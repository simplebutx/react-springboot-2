import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/shared/api/axios";
import "@/features/posts/styles/PostList.css";

export default function PostListPage() {
  const nav = useNavigate();

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    api.get("/posts")
      .then((res) => {
        if (ignore) return;
        setPosts(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        if (ignore) return;
        const msg =
          err?.response?.data?.message ||
          err?.response?.data ||
          "목록 조회 실패";
        setError(String(msg));
      });

    return () => {
      ignore = true;
    };
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

      {error && <div className="error">{error}</div>}

      {!error && posts.length === 0 && (
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
