import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    authorization: `Basic ${btoa(
      `${import.meta.env.VITE_BASIC_USERNAME}:${
        import.meta.env.VITE_BASIC_PASSWORD
      }`,
      "base64"
    )}`,
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token") || null;
    if (token) {
      request.headers["authorization"] = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

export default axiosInstance;
