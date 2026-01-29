import { useEffect, useState } from "react";
import api from "@/shared/api/axios";
import '@/features/admin/styles/AdminDashboard.css';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/admin/users")
      .then(res => setUsers(res.data))
      .catch(err => {
        const status = err.response?.status;
        if (status === 403) setError("관리자만 접근 가능합니다.");
        else setError("유저 목록을 불러오지 못했습니다.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 20 }}>로딩중...</div>;
  if (error) return <div style={{ padding: 20 }}>{error}</div>;

  return (
<div className="admin-container">
  <div className="admin-card">
    <h2>관리자 페이지 - 유저 목록</h2>

    <table className="admin-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>

      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.email}</td>
            <td>{u.name}</td>
            <td>{u.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}

const th = { textAlign: "left", padding: "8px", borderBottom: "1px solid #444" };
const td = { padding: "8px", borderBottom: "1px solid #333" };
