import axios from "axios";

const api = axios.create({
  baseURL: "/api",   // /api가 붙어있는지를 기준으로 로컬이냐 베포냐 구분
  withCredentials: true,                     
});


export default api;
