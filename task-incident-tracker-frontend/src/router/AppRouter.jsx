import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateTask from "../pages/CreateTask";
import MyTasks from "../pages/MyTasks";
import AllTasks from "../pages/AllTasks";
import ManageUsers from "../pages/ManageUsers";
import ProtectedRoute from "./ProtectedRoute";
import ManagerRoute from "./ManagerRoute";
import AdminRoute from "./AdminRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route 
          path="/create-task" 
          element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/my-tasks" 
          element={
            <ProtectedRoute>
              <MyTasks />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/all-tasks" 
          element={
            <ManagerRoute>
              <AllTasks />
            </ManagerRoute>
          } 
        />

        <Route 
          path="/manage-users" 
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}