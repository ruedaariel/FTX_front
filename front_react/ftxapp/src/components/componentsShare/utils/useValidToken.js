// hooks/useValidToken.js
import { getToken } from "../../../auth/token";
import { decodeToken } from "../../../auth/jwt";
import { useNavigate } from "react-router-dom";

export function useValidToken() {
  const navigate = useNavigate();

  const token = getToken("ftxAccessToken");
  if (!token) {
    navigate("/login");
    return null;
  }

  const datos = decodeToken(token);
  const now = Math.floor(Date.now() / 1000);
  if (datos.exp < now) {
    sessionStorage.removeItem("ftxAccessToken");
    navigate("/login");
    return null;
  }

  return datos;
}
