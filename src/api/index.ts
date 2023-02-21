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

// // add a response interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const originalRequest = error.config;
//     console.log(originalRequest.url);
//     if (
//       error.response.status === 401
//       //   &&
//       //   originalRequest.url === "http://localhost:9000/auth/refresh"
//     ) {
//       return Promise.reject(error);
//     }

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       return api
//         .post("/auth/refresh", { withCredentials: true })
//         .then((res) => {
//           if (res.status === 201) {
//             // payload: res.data.accessToken,
//             localStorage.setItem("at", JSON.stringify(res.data.accessToken));
//             return api(originalRequest);
//           }
//         });
//     }
//     return Promise.reject(error);
//   }
// );
