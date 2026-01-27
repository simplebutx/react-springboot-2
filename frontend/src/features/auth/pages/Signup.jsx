import { useState } from "react";
import api from "@/shared/api/axios"
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/signup", { email, password, name });
      alert("회원가입 성공!");
      nav("/login");
    } catch (e) {
      alert("회원가입 실패");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호" type="password" />
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" />
      <button>회원가입</button>
    </form>
  );
}
