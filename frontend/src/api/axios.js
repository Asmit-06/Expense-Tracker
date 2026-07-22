import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        return Promise.reject(error);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/refresh`,
        {
          refreshToken,
        }
      );
      

      localStorage.setItem("token", res.data.newAccessToken);

      originalRequest.headers.Authorization =
        `Bearer ${res.data.newAccessToken}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);
export default api;
