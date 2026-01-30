import { useEffect, useState } from "react";
import api from "@/shared/api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '@/shared/styles/Navbar.css';
import { useUI } from "@/shared/ui/uiStore";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const ui = useUI();

  // 로그인 상태 확인
  useEffect(() => {
    api.get("/auth/me")
      .then(res => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      });
  }, [location]);

  const logout = async () => {
    await api.post("/logout");
    setUser(null);
    ui.toast("로그아웃 완료");
    navigate("/");
  };

  return (
 <nav className="navbar">
  <Link to="/" className="logo">HOME</Link>

  <div className="nav-right">
    {user ? (
      <>
        <span className="user-email">{user.email} 님</span>

        <Link to="/mypage">마이페이지</Link>

        {user.role === "ADMIN" && (
        <Link to="/admin">관리자페이지</Link>
        )}
        <button onClick={logout}>로그아웃</button>
      </>
    ) : (
      <>
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
      </>
    )}
  </div>
</nav>

  );
}