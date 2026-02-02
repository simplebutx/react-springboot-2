import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/shared/api/axios";
import "@/features/posts/styles/PostEdit.css";
import { useUI } from "@/shared/ui/uiStore";

export default function PostEditPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const ui = useUI();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/post/${id}`);
        setTitle(res.data?.title ?? "");
        setContent(res.data?.content ?? "");
      } catch (err) {
        ui.toast("게시글을 불러오지 못했습니다.");
        nav("/posts");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);


  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return ui.toast("제목을 입력해주세요.");
    if (!content.trim()) return ui.toast("내용을 입력해주세요.");

    try {
      await api.put(`/post/${id}`, {
        title: title.trim(),
        content: content.trim(),
      });

      ui.toast("수정 완료");
      nav(`/posts/${id}`);
    } catch (err) {
      if (!err.response) return ui.toast("서버에 연결할 수 없습니다.");
      if (err.response.status >= 500) return ui.toast("서버 오류가 발생했습니다.");

      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        "수정에 실패했습니다.";
      ui.toast(String(msg));
    }
  };

  if (loading) {
    return (
      <div className="post-edit-container">
        <div className="post-edit-card">불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className="post-edit-container">
      <div className="post-edit-card">
        <h2>글 수정</h2>

        <form className="post-edit-form" onSubmit={onSubmit}>
          <label className="field">
            <span className="label">제목</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              maxLength={100}
            />
          </label>

          <label className="field">
            <span className="label">내용</span>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              rows={10}
            />
          </label>

          <div className="actions">
            <button
              type="button"
              className="btn ghost"
              onClick={() => nav(-1)}
            >
              취소
            </button>

            <button type="submit" className="btn primary">
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
