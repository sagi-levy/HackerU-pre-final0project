import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const ProtectedRouteNotBiz = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return (window.location.href = "http://localhost:3000/sign-in");
  }

  return children;
};
export default ProtectedRouteNotBiz;
