import { useState } from "react";
import api from "@/shared/api/axios"
import { useNavigate } from "react-router-dom";
import '@/features/auth/styles/Signup.css';
import { useUI } from "@/shared/ui/uiStore";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export default function Signup() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const ui = useUI();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", { email, password, name });
      ui.toast("회원가입 성공!");
      nav("/login");
    } catch (err) {
      if (!err.response) ui.toast("서버에 연결할 수 없습니다.");
        else if (err.response.status >= 500) ui.toast("서버 오류가 발생했습니다.");
        else {
          ui.toast(getErrorMessage(err, "회원가입 실패"));
        }
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
