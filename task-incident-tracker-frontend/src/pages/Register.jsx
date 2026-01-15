import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { saveToken } from "../utils/authStorage";
import "../styles/global.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await register(username, password);
      saveToken(res.accessToken);
      navigate("/my-tasks");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-content">
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
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

        <button type="submit">Register</button>
      </form>

      {error && <p className="error">{error}</p>}

      <p className="auth-footer">
        Already have an account?{" "}
        <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}