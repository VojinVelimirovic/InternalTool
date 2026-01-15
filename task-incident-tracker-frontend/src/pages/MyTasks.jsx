import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import { getMyTasks } from "../api/tasks";
import "../styles/global.css";
import "../styles/MyTasks.css";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const pageSize = 6;

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const fetchTasks = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await getMyTasks(page, pageSize);
      
      if (response.data) {
        setTasks(response.data);
        setTotalPages(Math.ceil(response.totalCount / pageSize));
      } else {
        setTasks([]);
        setTotalPages(1);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <div className="container">
          <p className="error">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      <div className="container">
        <h1>My Tasks</h1>

        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks currently assigned to you</p>
        ) : (
          <>
            <div className="tasks-grid">
              {tasks.map((task) => (
                <div key={task.id} className="task-card">
                  <h2 className="task-title">{task.title}</h2>
                  <p className="task-description">{task.description}</p>
                  
                  <div className="task-meta">
                    <span className={`status status-${task.status.toLowerCase()}`}>
                      {task.status}
                    </span>
                    <span className={`priority priority-${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </div>

                  <div className="task-section">
                    <label>Created by:</label>
                    <div className="user-card">
                      {task.createdBy.username}
                    </div>
                  </div>

                  <div className="task-section">
                    <label>Assigned to:</label>
                    <div className="assigned-users">
                      {task.assignedTo.map((user) => (
                        <div key={user.id} className="user-card">
                          {user.username}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={page === pageNum ? "active" : ""}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}