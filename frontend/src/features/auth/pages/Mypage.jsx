import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/shared/api/axios";
import '@/features/auth/styles/Mypage.css';
import { useUI } from "@/shared/ui/uiStore";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export default function MyPage() {
  const nav = useNavigate();
  const ui = useUI();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  

useEffect(() => {
  api.get("/auth/me")
    .then(res => setUser(res.data))
    .catch(err => {
      if (err.response?.status === 401) {
        nav("/login", { replace: true });
      }
    })
    .finally(() => setLoading(false));
}, [nav]);



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/users/me/posts");
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

  if (loading) return <div style={{ padding: 20 }}>로딩중...</div>;
  if (!user) return null;

const handleWithdraw = async () => {
  if (!confirm("정말 회원을 탈퇴하시겠습니까? 작성한 글은 모두 삭제됩니다.")) return;

  try {
    await api.delete('/users/me');
    ui.toast("삭제 완료");
    await api.post("/logout");
    nav("/");
  } catch (err) {
      if (!err.response) ui.toast("서버에 연결할 수 없습니다.");
      else if (err.response.status >= 500) ui.toast("서버 오류가 발생했습니다.");
      else {
        ui.toast(getErrorMessage(err, "삭제 실패"));
      }
  }
};

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
<div className="mypage-container">
  <div className="mypage-card">
    <h2>마이페이지</h2>

    <div className="row">
      <span>이메일</span>
      <span>{user.email}</span>
    </div>

    <div className="row">
      <span>이름</span>
      <span>{user.name}</span>
    </div>

    <div className="row">
      <span>권한</span>
      <span>{user.role}</span>
    </div>

    <div className="mypage-actions">
      <button className="mypage-btn btn-delete" onClick={handleWithdraw}>회원탈퇴</button>
    </div>
  </div>
</div>




    <div className="postlist-container">
      <div className="postlist-header">
        <h2>내가 쓴 글 목록</h2>
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
</>
  );
}

