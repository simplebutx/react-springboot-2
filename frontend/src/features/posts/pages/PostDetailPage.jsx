import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/shared/api/axios";
import "@/features/posts/styles/PostDetail.css";
import Comments from "@/features/posts/components/comments";
import { useUI } from "@/shared/ui/uiStore";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";



export default function PostDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const ui = useUI();

  const [post, setPost] = useState(null);

  const formatDate = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? String(value) : d.toLocaleString();
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/post/${id}`); 
        setPost(res.data);
      } catch (err) {
         if (err?.response?.status === 401) {
        ui.toast("로그인이 필요합니다.");
         nav("/login");
          return;
  }
        if (!err.response) ui.toast("서버에 연결할 수 없습니다.");
        else if (err.response.status >= 500) ui.toast("서버 오류가 발생했습니다.");
        else {
          ui.toast(getErrorMessage(err, "불러오기 실패"));
        }
        nav("/posts");
      }
    };

    fetchPost();
  }, [id]);

  const onDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await api.delete(`/post/${id}`); 
      ui.toast("삭제 완료");
      nav("/posts");
    } catch (err) {
      if (!err.response) ui.toast("서버에 연결할 수 없습니다.");
      else if (err.response.status >= 500) ui.toast("서버 오류가 발생했습니다.");
      else {
        ui.toast(getErrorMessage(err, "삭제 실패"));
      }
    }
  };

  if (!post) return null;

  return (
 <div className="post-detail-container">
  <div className="post-detail-card">
    <div className="post-detail-top">
      <h2 className="post-title">{post.title}</h2>

      <div className="post-meta">
        <span className="meta-item">
          <span className="meta-label">작성자</span>
          <span className="meta-value">{post.authorName ?? "-"}</span>
        </span>

        <span className="meta-item">
          <span className="meta-label">작성일</span>
          <span className="meta-value">{formatDate(post.createdAt)}</span>
        </span>
      </div>
    </div>

    <div className="post-content">{post.content}</div>

    <div className="post-actions">
      <button className="btn ghost" onClick={() => nav(-1)}>
        뒤로
      </button>

      <div className="right-actions">
        {post.canEdit && (
          <button className="btn ghost" onClick={() => nav(`/posts/${id}/edit`)}>
            수정
          </button>
        )}

        {post.canDelete && (
          <button className="btn danger" onClick={onDelete}>
            삭제
          </button>
        )}

        <button className="btn primary" onClick={() => nav("/posts")}>
          목록
        </button>
      </div>
    </div>
  </div>

  <div className="comments-section">
    <Comments />
  </div>
</div>

  );
}
