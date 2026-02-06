import { useState } from "react";
import api from "@/shared/api/axios";
import '@/features/auth/styles/Login.css';
import { useNavigate } from "react-router-dom";
import { useUI } from "@/shared/ui/uiStore";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const ui = useUI();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

   const googleLoginUrl = backendUrl
    ? `${backendUrl.replace(/\/$/, "")}/oauth2/authorization/google`
    : null;

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new URLSearchParams();
      form.append("username", email.trim()); // email을 username으로 보냄
      form.append("password", password);

      await api.post("/login", form, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      ui.toast("로그인 성공");
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
        ui.toast("아이디 또는 비밀번호가 올바르지 않습니다.");    // 로그인만 메세지 하드코딩
      }
  };

   const onGoogleLogin = () => {
    // ✅ 배포 디버깅: env가 비었는지 바로 알 수 있게
    if (!googleLoginUrl) {
      console.error("VITE_BACKEND_URL is missing:", backendUrl);
      ui.toast("백엔드 주소가 설정되지 않았습니다. (VITE_BACKEND_URL)");
      return;
    }
    window.location.assign(googleLoginUrl);
  };

  return (
    <>
    
    <form className="login-form" onSubmit={onSubmit}>
  <h2>Login</h2>

  <input
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="이메일"
  />

  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="비밀번호"
  />

  <button type="submit">로그인</button>
   <button type="button" className="google-login-btn" onClick={onGoogleLogin}>
          Google로 로그인
        </button>

</form>





</>
  );
}
