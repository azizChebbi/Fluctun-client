import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9000",
  withCredentials: true,
});

const getAccessToken = () => {
  const sat = localStorage.getItem("at");
  if (typeof sat == "string" && sat.length != 0) {
    const at: string = JSON.parse(sat);
    return at;
  }
  return null;
};

// add a request interceptor
api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (err) => {
    Promise.reject(err);
  }
);
