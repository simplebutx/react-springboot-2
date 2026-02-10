export function getErrorMessage(err, fallback = "요청에 실패했습니다.") {
  if (!err.response) return "서버에 연결할 수 없습니다.";

  const status = err.response.status;
  const msg = err.response.data?.message;

  // 인증/권한: 서버 메시지가 있으면 우선
  if (status === 401) return msg || "로그인이 필요합니다.";
  if (status === 403) return msg || "접근 권한이 없습니다.";

  if (status >= 500) return "서버 오류가 발생했습니다.";

  if (msg) return msg;

  return fallback;
}
