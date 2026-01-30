export function getErrorMessage(err, fallback = "요청에 실패했습니다.") {
  // 서버 응답 자체가 없으면 (서버 꺼짐, 네트워크 에러)
  if (!err.response) return "서버에 연결할 수 없습니다.";

   // err.response.data.message == 서버에서 설정한 오류 메세지
  const status = err.response.status;

  // 인증/권한
  if (status === 401) return "로그인이 필요합니다.";
  if (status === 403) return "접근 권한이 없습니다.";

  // 서버 에러
  if (status >= 500) return "서버 오류가 발생했습니다.";

  // 서버에서 내려준 메시지
  const msg = err.response.data?.message;
  if (msg) return msg;

  return fallback;
}