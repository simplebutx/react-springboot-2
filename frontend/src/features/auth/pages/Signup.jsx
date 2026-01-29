import { useState } from "react";
import api from "@/shared/api/axios"
import { useNavigate } from "react-router-dom";
import '@/features/auth/styles/Signup.css';

export default function Signup() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", { email, password, name });
      alert("회원가입 성공!");
      nav("/login");
    } catch (e) {
      alert("회원가입 실패");
    }
  };

  return (
    <form className="signup-form" onSubmit={onSubmit}>
      <h2>Sign Up</h2>

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

  <input
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="이름"
  />

  <button type="submit">회원가입</button>
</form>

  );
}
