import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { saveToken } from "../utils/authStorage";
import "../styles/global.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await login(username, password);
      saveToken(res.accessToken);
      navigate("/my-tasks");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-content">
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      {error && <p className="error">{error}</p>}

      <p className="auth-footer">
        Don't have an account?{" "}
        <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}