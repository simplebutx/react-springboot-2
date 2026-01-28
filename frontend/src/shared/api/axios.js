import axios from "axios";

const api = axios.create({
  baseURL: "",
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
