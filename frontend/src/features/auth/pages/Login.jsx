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
  const GOOGLE_LOGIN_URL =
  import.meta.env.VITE_BACKEND_URL + "/oauth2/authorization/google";

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
  

</form>

<a href={GOOGLE_LOGIN_URL} className="login-form button ">
  <button>Google로 로그인</button>
</a>

</>
  );
}
