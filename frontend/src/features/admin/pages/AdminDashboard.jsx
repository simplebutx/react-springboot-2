import { useEffect, useState } from "react";
import api from "@/shared/api/axios";
import '@/features/admin/styles/AdminDashboard.css';
import { useUI } from "@/shared/ui/uiStore";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const ui = useUI();
  
  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
      setError("");
    } catch (err) {
      const status = err.response?.status;
      if (status === 403) setError("관리자만 접근 가능합니다.");
      else setError("유저 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (!ok) return;

    try {
      await api.delete(`/admin/users/${id}`);
      ui.toast("유저 삭제 완료");
      fetchUsers();

    } catch (err) {
      ui.toast("유저 삭제 실패");
      console.error(err);
    }
  };

  const handleRoleSave = async (id, role) => {
  const ok = window.confirm(`권한을 ${role}로 변경할까요?`);
  if (!ok) return;

  try {
    await api.put(`/admin/users/${id}`, { role });
    ui.toast("권한 변경 완료");
    fetchUsers(); 
  } catch (e) {
    ui.toast("권한 변경 실패");
    fetchUsers(); 
  }
};

  if (loading) return <div style={{ padding: 20 }}>로딩중...</div>;
  if (error) return <div style={{ padding: 20 }}>{error}</div>;

  return (
<div className="admin-container">
  <div className="admin-card">
    <h2>관리자 페이지 - 유저 목록</h2>

    <table className="admin-table">
      <thead>
        <tr>
          <th>고유 번호</th>
          <th>Email</th>
          <th>Name</th>
          <th>Role</th>
          <th>관리</th>
        </tr>
      </thead>

      <tbody>
        {users.map(u => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.email}</td>
            <td>{u.name}</td>
            <td>{u.role}</td>
                <td className="admin-actions">
                    <select
                      className="role-select"
                      value={u.role}
                      onChange={(e) => {
                        const newRole = e.target.value;
                        setUsers(prev =>
                          prev.map(x => x.id === u.id ? { ...x, role: newRole } : x)
                        );
                      }}
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                    <button className="admin-btn btn-role" onClick={() => handleRoleSave(u.id, u.role)}>권한 변경</button>
                    <button className="admin-btn btn-delete" onClick={() => handleDelete(u.id)}>유저삭제</button>
                </td>
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
