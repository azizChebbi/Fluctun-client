import jwtDecode from "jwt-decode";
import useLocalStorage from "./useLocalstorage";

export type Role = "student" | "teacher" | "";

export type JwtPayload = {
  id: string;
  role: Role;
  instituteId: string;
};

function usePayload() {
  const [token] = useLocalStorage("at", null);
  let decoded: JwtPayload = {
    id: "",
    role: "",
    instituteId: "",
  };
  if (token) decoded = jwtDecode(token);
  return decoded;
}

export default usePayload;
