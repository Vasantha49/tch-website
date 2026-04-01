import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;

  if (adminOnly && user.role !== "admin") {
    return <h1 className="section">Not authorized</h1>;
  }

  return children;
}

export default ProtectedRoute;