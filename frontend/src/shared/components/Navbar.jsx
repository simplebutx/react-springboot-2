import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/shared/api/axios";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  // 로그인 상태 확인
  useEffect(() => {
    api.get("/api/auth/me")
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
    window.location.href = "/";
  };

  return (
    <nav style={styles.nav}>
      <Link to="/">Home</Link>

      <div>
        {user ? (
          <>
            <span style={{ marginRight: 10 }}>
              {user.email} 님
            </span>

            <Link to="/mypage">마이페이지</Link>
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

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    background: "#222",
    color: "white"
  }
};
