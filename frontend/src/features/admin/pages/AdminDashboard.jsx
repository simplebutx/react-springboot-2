import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "@/shared/api/axios";
import "@/features/admin/styles/AdminDashboard.css";
import { useUI } from "@/shared/ui/uiStore";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

export default function AdminDashboard() {
  const ui = useUI();
  const nav = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  // URL에서 page / keyword 읽기
  const pageParam = Number(searchParams.get("page") ?? "0");
  const page =
    Number.isFinite(pageParam) && pageParam >= 0 ? pageParam : 0;

  const keyword = (searchParams.get("keyword") ?? "").trim();
  const size = 10;

  // 입력창용 state (타이핑 중 즉시 검색 방지)
  const [keywordInput, setKeywordInput] = useState(keyword);

  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // URL keyword 바뀌면 input도 동기화
  useEffect(() => {
    setKeywordInput(keyword);
  }, [keyword]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const params = { page, size };
      if (keyword) params.keyword = keyword;

      const res = await api.get("/admin/users", { params });

      const data = res.data;
      setUsers(Array.isArray(data?.items) ? data.items : []);
      setTotalPages(
        Number.isFinite(data?.totalPages) ? data.totalPages : 0
      );

      setError("");
    } catch (err) {
      if (err.response?.status === 401) {
        nav("/login", { replace: true });
        return;
      }
      if (err.response?.status === 403) {
        setError("관리자만 접근 가능합니다.");
        return;
      }

      setError(getErrorMessage(err, "유저 목록을 불러오지 못했습니다"));
    } finally {
      setLoading(false);
    }
  };

  // page / keyword 변경 시 재조회
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, keyword]);

  const goPage = (nextPage) => {
    const safe = Math.max(
      0,
      Math.min(nextPage, Math.max(totalPages - 1, 0))
    );

    setSearchParams((prev) => {
      const sp = new URLSearchParams(prev);
      sp.set("page", String(safe));
      if (keyword) sp.set("keyword", keyword);
      else sp.delete("keyword");
      return sp;
    });
  };

  const onSearch = () => {
    const nextKeyword = keywordInput.trim();

    setSearchParams((prev) => {
      const sp = new URLSearchParams(prev);
      sp.set("page", "0");
      if (nextKeyword) sp.set("keyword", nextKeyword);
      else sp.delete("keyword");
      return sp;
    });
  };

  const pageNumbers = useMemo(() => {
    if (!totalPages) return [];
    const start = Math.max(0, page - 2);
    const end = Math.min(totalPages - 1, page + 2);
    const nums = [];
    for (let i = start; i <= end; i++) nums.push(i);
    return nums;
  }, [page, totalPages]);

  const handleDelete = async (id) => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (!ok) return;

    try {
      await api.delete(`/admin/users/${id}`);
      ui.toast("유저 삭제 완료");
      fetchUsers();
    } catch (err) {
      ui.toast(getErrorMessage(err, "유저 삭제 실패"));
    }
  };

  const handleRoleSave = async (id, role) => {
    const ok = window.confirm(`권한을 ${role}로 변경할까요?`);
    if (!ok) return;

    try {
      await api.put(`/admin/users/${id}`, { role });
      ui.toast("권한 변경 완료");
      fetchUsers();
    } catch (err) {
      ui.toast(getErrorMessage(err, "권한 변경 실패"));
    }
  };

  if (loading) return <div style={{ padding: 20 }}>로딩중...</div>;
  if (error) return <div style={{ padding: 20 }}>{error}</div>;

  return (
    <div className="admin-container">
      <div className="admin-card">
        <div className="admin-header">
          <h2>회원 목록</h2>

          {/* 검색창 */}
          <div className="admin-actions-top">
            <div className="searchbar">
              <input
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSearch();
                }}
                placeholder="이메일 / 이름 검색"
              />
              <button className="btn primary" onClick={onSearch}>
                검색
              </button>
            </div>
          </div>
        </div>

        {users.length === 0 && (
          <div className="empty">
            {keyword
              ? `“${keyword}” 검색 결과가 없습니다.`
              : "유저가 없습니다."}
          </div>
        )}

        <table className="admin-table">
          <thead>
            <tr>
              <th>고유 번호</th>
              <th>Email</th>
              <th>이름</th>
              <th>권한</th>
              <th>회원관리</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>{u.name ?? "-"}</td>
                <td>{u.role}</td>
                <td className="admin-actions">
                  <select
                    className="role-select"
                    value={u.role}
                    onChange={(e) => {
                      const newRole = e.target.value;
                      setUsers((prev) =>
                        prev.map((x) =>
                          x.id === u.id ? { ...x, role: newRole } : x
                        )
                      );
                    }}
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>

                  <button
                    className="admin-btn btn-role"
                    onClick={() => handleRoleSave(u.id, u.role)}
                  >
                    권한 변경
                  </button>

                  <button
                    className="admin-btn btn-delete"
                    onClick={() => handleDelete(u.id)}
                  >
                    유저삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          <button
            className="btn ghost"
            onClick={() => goPage(0)}
            disabled={page === 0 || totalPages === 0}
          >
            처음
          </button>

          <button
            className="btn ghost"
            onClick={() => goPage(page - 1)}
            disabled={page === 0 || totalPages === 0}
          >
            이전
          </button>

          {pageNumbers.map((n) => (
            <button
              key={n}
              className={`btn page ${n === page ? "active" : ""}`}
              onClick={() => goPage(n)}
            >
              {n + 1}
            </button>
          ))}

          <button
            className="btn ghost"
            onClick={() => goPage(page + 1)}
            disabled={totalPages === 0 || page >= totalPages - 1}
          >
            다음
          </button>

          <button
            className="btn ghost"
            onClick={() => goPage(totalPages - 1)}
            disabled={totalPages === 0 || page >= totalPages - 1}
          >
            마지막
          </button>

          <span className="page-info">
            {totalPages === 0
              ? "0 / 0"
              : `${page + 1} / ${totalPages}`}
          </span>
        </div>
      </div>
    </div>
  );
}
