import { API_BASE_URL } from "../config/api";
import { getToken } from "../utils/authStorage";

const API_URL = `${API_BASE_URL}/tasks`;

export const createTask = async (task) => {
  const token = getToken();

  const response = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to create task");
  }

  return response.json();
};

export const getMyTasks = async (page = 1, pageSize = 5) => {
  const token = getToken();

  const response = await fetch(`${API_URL}/my?page=${page}&pageSize=${pageSize}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to fetch tasks");
  }

  return response.json();
};

export const getAllTasks = async (page = 1, pageSize = 10) => {
  const token = getToken();

  const response = await fetch(`${API_URL}?page=${page}&pageSize=${pageSize}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to fetch tasks");
  }

  return response.json();
};

export const assignTask = async (taskId, userIds) => {
  const token = getToken();

  const response = await fetch(`${API_URL}/assign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ taskId, userIds }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to assign task");
  }

  return response.json();
}

export const changeTaskStatus = async (taskId, status) => {
  const token = getToken();

  const response = await fetch(`${API_URL}/change-status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ taskId, status }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to change status");
  }

  return response.json();
};