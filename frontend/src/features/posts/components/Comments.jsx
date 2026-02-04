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


    useEffect(()=> {
        const fetchComments = async () => {
            try {
                const res = await api.get(`/posts/${id}/comments`)
                setComments(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                if(!err.response) { 
                   ui.toast("서버에 연결할 수 없습니다.");  
                   return;
                }

                if(err.response.status >= 500) {
                    ui.toast("서버 오류가 발생했습니다.");
                    return;
                }
                ui.toast(getErrorMessage(err, "목록 조회 실패"));
            }
        };
        fetchComments();
    }, [id])

    const handleSubmit = async () => {
        await api.post('/posts/{id}/comments')
    }

    const handleEdit = async () => {
        await api.put('/posts/{id}/comments')
    }

    const handleDelete = async () => {
        if(!confirm("정말 삭제하시겠습니까?"))  return; 
        await api.delete('/posts/{id}/comments')
    }

    const formatDate = (isoString) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return String(isoString);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  };



    return (
        <>
           <div className="comments-wrap">
  <div className="comments-title">댓글</div>

  <div className="comments-list">
    {comments.map((c) => (
      <div className="comment-item" key={c.id}>

        <div className="comment-row">
          <div className="comment-author">{c.authorName}</div>
          <div className="comment-content">{c.content}</div>
          <div className="comment-item-actions">
            <button
              type="button"
              onClick={() => handleEdit(c.id)}
            >
              수정
            </button>
            <button
              type="button"
              onClick={() => handleDelete(c.id)}
            >
              삭제
            </button>
          </div>
        </div>

        <div className="comment-date">
          {formatDate(c.createdAt)}
        </div>

      </div>
    ))}
  </div>

  <form className="comment-form">
    <input className="comment-input" placeholder="댓글을 입력하세요"/>
      <button type="button" className="btn btn-primary" onClick={handleSubmit}>작성</button>
  </form>
</div>


        </>
    )
}

export default Comments;