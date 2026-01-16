import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { changeUserRole, getAllUsers } from "../api/users";
import "../styles/global.css";
import "../styles/ManageUsers.css";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getAllUsers();
      if (response.data) {
        setUsers(response.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (user) => {
    setEditingUser(user.id);
    setNewRole(user.role);
  };

  const handleSave = async (username) => {
    setSaving(true);
    setError("");

    try {
      await changeUserRole(username, newRole);
      await fetchUsers();
      setEditingUser(null);
      setNewRole("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
    setNewRole("");
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="container">
        <h1>Manage Users</h1>

        {error && <p className="error">{error}</p>}

        <div className="users-table">
          <div className="table-header">
            <div className="header-cell">Username</div>
            <div className="header-cell">Role</div>
            <div className="header-cell">Actions</div>
          </div>

          {users.map((user) => (
            <div key={user.id} className="table-row">
              <div className="table-cell username-cell">{user.username}</div>
              
              <div className="table-cell role-cell">
                {editingUser === user.id ? (
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="role-select"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="User">User</option>
                  </select>
                ) : (
                  <span className={`role-badge role-${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                )}
              </div>

              <div className="table-cell actions-cell">
                {editingUser === user.id ? (
                  <div className="action-buttons">
                    <button
                      onClick={() => handleSave(user.username)}
                      disabled={saving}
                      className="btn-save"
                    >
                      {saving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={saving}
                      className="btn-cancel"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleRoleChange(user)}
                    className="btn-edit"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}