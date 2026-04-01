import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          role: "admin",
        })
      );
      navigate("/admin/board");
    } else {
      alert("Invalid admin password");
    }
  };

  return (
    <div className="section">
      <h1>Admin Login</h1>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;