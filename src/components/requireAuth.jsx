import { Navigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
export default function RequrireAuth({ children }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
}
