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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new URLSearchParams();
      form.append("username", email.trim()); // email을 username으로 보냄
      form.append("password", password);

      await api.post("login", form, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      ui.toast("로그인 성공");
      nav("/mypage");
    } catch (e) {
      ui.toast("로그인 실패");
    }
  };

  return (
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

  );
}
