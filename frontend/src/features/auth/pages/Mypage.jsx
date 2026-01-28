import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/shared/api/axios";
import '@/features/auth/styles/Mypage.css';

export default function MyPage() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/auth/me")
      .then(res => setUser(res.data))
      .catch(err => {
        if (err.response?.status === 401) {
          nav("/login", { replace: true });
        }
      })
      .finally(() => setLoading(false));
  }, [nav]);

  if (loading) return <div style={{ padding: 20 }}>로딩중...</div>;
  if (!user) return null;

  return (
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
  </div>
</div>

  );
}

