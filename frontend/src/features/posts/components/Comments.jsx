import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUI } from "@/shared/ui/uiStore";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
import api from "@/shared/api/axios";
import "@/features/posts/styles/Comments.css";

function Comments() {
    const nav = useNavigate();
    const ui = useUI();
    const {id} = useParams();
    
    const [content, setContent] = useState("");
    const [comments, setComments] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editContent, setEditContent] = useState("");


    const fetchComments = async () => {
            try {
                const res = await api.get(`/posts/${id}/comments`)
                setComments(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                if(!err.response) ui.toast("서버에 연결할 수 없습니다.");
                else if(err.response.status >= 500) ui.toast("서버 오류가 발생했습니다.");
                else ui.toast(getErrorMessage(err, "목록 조회 실패"));
            }
    };

    useEffect(() => {
      fetchComments();
    }, [id]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        await api.post(`/posts/${id}/comments`, {
          content: content.trim()
        })
         ui.toast("글이 등록되었습니다.");
        setContent("");
        fetchComments();
      } catch (err) {
        if (!err.response) ui.toast("서버에 연결할 수 없습니다.");
        else if (err.response.status >= 500)  ui.toast("서버 오류가 발생했습니다.");
        else ui.toast(getErrorMessage(err, "글쓰기 실패"));
      }
    }

    const startEdit = (comment) => {
      setEditingId(comment.id);
      setEditContent(comment.content);
    };

    const submitEdit = async (commentId) => {
    const next = editContent.trim();
    if (!next) return ui.toast("내용을 입력해주세요.");

    try {
      await api.put(`/posts/${id}/comments/${commentId}`, { content: next });
      ui.toast("수정 완료");
      setEditingId(null);
      setEditContent("");
      fetchComments();
    } catch (err) {
      if (!err.response) ui.toast("서버에 연결할 수 없습니다.");
      else if (err.response.status >= 500) ui.toast("서버 오류가 발생했습니다.");
      else ui.toast(getErrorMessage(err, "수정 실패"));
    }
  };

const cancelEdit = () => {
  setEditingId(null);
  setEditContent("");
};


    const handleDelete = async (commentId) => {
        if(!confirm("정말 삭제하시겠습니까?"))  return; 
        try {
          await api.delete(`/posts/${id}/comments/${commentId}`)
          ui.toast("삭제 완료");
          fetchComments();
        } catch (err) {
          if (!err.response) ui.toast("서버에 연결할 수 없습니다.");
        else if (err.response.status >= 500)  ui.toast("서버 오류가 발생했습니다.");
        else ui.toast(getErrorMessage(err, "삭제 실패"));
        }
    }


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


    return (
        <>
  <div className="comments-wrap">
  <div className="comments-title">댓글 {comments.length}개</div>

  <div className="comments-list">
    {comments.map((c) => (
      <div className="comment-item" key={c.id}>

        <div className="comment-row">
  <div className="comment-author">{c.authorName}</div>

  {editingId === c.id ? (
  <div className="comment-edit">
    <input
      className="comment-edit-input"
      value={editContent}
      onChange={(e) => setEditContent(e.target.value)}
      maxLength={100}
    />
    <div className="comment-edit-actions">
      <button type="button" onClick={() => submitEdit(c.id)}>저장</button>
      <button type="button" onClick={cancelEdit}>취소</button>
    </div>
  </div>
) : (
  <>
    <div className="comment-content">{c.content}</div>

    <div className="comment-item-actions">
      {c.canEdit && (
        <button type="button" onClick={() => startEdit(c)}>수정</button>
      )}

      {c.canDelete && (
        <button type="button" onClick={() => handleDelete(c.id)}>삭제</button>
      )}
    </div>
  </>
)}
</div>

        <div className="comment-date">
          {formatDate(c.createdAt)}
          {c.updatedAt && (
            <span> (수정됨)</span>
          )}
        </div>

      </div>
    ))}
  </div>

  <form className="comment-form" onSubmit={handleSubmit}>
    <input className="comment-input" value={content} 
    onChange={(e)=>setContent(e.target.value)} 
    placeholder="댓글을 입력하세요"
    maxLength={100}/>
      <button type="submit" className="btn btn-primary" >작성</button>
  </form>
</div>


        </>
    )
}

export default Comments;