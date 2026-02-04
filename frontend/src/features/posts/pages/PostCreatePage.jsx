import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/shared/api/axios";
import "@/features/posts/styles/PostCreate.css";
import { useUI } from "@/shared/ui/uiStore";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export default function PostCreatePage() {
  const nav = useNavigate();
  const ui = useUI();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/posts", {
        title: title.trim(),
        content: content.trim(),
      });

      ui.toast("글이 등록되었습니다.");
      nav("/posts");
    } catch (err) {
      if (!err.response) {
        ui.toast("서버에 연결할 수 없습니다.");
        return;
      }

      if (err.response.status >= 500) {
        ui.toast("서버 오류가 발생했습니다.");
        return;
      }

      ui.toast(getErrorMessage(err, "글쓰기 실패"));
    }
  };

  return (
    <div className="post-create-container">
      <div className="post-create-card">
        <h2>글쓰기</h2>

        <form className="post-create-form" onSubmit={onSubmit}>
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
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
