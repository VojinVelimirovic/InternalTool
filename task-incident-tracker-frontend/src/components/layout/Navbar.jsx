import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/authStorage";
import { isManager, isAdmin } from "../../utils/authUtils";
import "../../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  const managerAccess = isManager();
  const adminAccess = isAdmin();

  return (
    <nav>
      <div className="nav-content">
        <div className="nav-left">
          <button onClick={() => navigate("/my-tasks")}>My Tasks</button>
          {managerAccess && (
            <button onClick={() => navigate("/all-tasks")}>All Tasks</button>
          )}
          <button onClick={() => navigate("/create-task")}>Create Task</button>
          {adminAccess && (
            <button onClick={() => navigate("/manage-users")}>Manage Users</button>
          )}
        </div>
        <div className="nav-right">
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </nav>
  );
}