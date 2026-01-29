import axios from "axios";

const api = axios.create({
  baseURL: "/api",   // /api가 붙어있는지를 기준으로 로컬이냐 베포냐 구분
  withCredentials: true,                     
});


// 응답에러 공통처리 (선택)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data ||
      err.message;

    console.log("API Error:", msg);

    return Promise.reject(err);
  }
);

export default api;
