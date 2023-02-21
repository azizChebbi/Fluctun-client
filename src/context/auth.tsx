import { api } from "@api/index";
import { configureAuth } from "react-query-auth";

export const { useUser, useLogin, useRegister, useLogout } = configureAuth({
  userFn: () => api.get("/me"),
  loginFn: (credentials) => api.post("/login", credentials),
  registerFn: (credentials) => api.post("/register", credentials),
  logoutFn: () => api.post("/logout"),
});
