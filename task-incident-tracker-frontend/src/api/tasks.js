import { getToken } from "../utils/authStorage";

const BASE_URL = "http://localhost:5000/api/tasks";

export const createTask = async (task) => {
  const token = getToken();

  const response = await fetch(`${BASE_URL}/create`, {
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

  const response = await fetch(`${BASE_URL}/my?page=${page}&pageSize=${pageSize}`, {
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
