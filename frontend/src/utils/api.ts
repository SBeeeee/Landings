import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api",
  withCredentials: true,
  xsrfCookieName: 'csrf_token',
  xsrfHeaderName: 'x-csrf-token',
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('csrf_token='))
      ?.split('=')[1];

    if (token) {
      config.headers = config.headers ?? {};
      config.headers['x-csrf-token'] = decodeURIComponent(token);
    }
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.error ?? err.message ?? "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export default api;
