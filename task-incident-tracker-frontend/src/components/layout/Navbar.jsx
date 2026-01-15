import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/authStorage";
import "../../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <nav>
      <div className="nav-content">
        <div className="nav-left">
          <button onClick={() => navigate("/my-tasks")}>My Tasks</button>
          <button onClick={() => navigate("/create-task")}>Create Task</button>
        </div>
        <div className="nav-right">
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </nav>
  );
}