import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/shared/api/axios";

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
    <div style={{ padding: 20 }}>
      <h2>마이페이지</h2>
      <div>아이디(이메일): {user.email}</div>
      <div>이름: {user.name} 님</div>
      <div>권한: {user.role}</div>
    </div>
  );
}

