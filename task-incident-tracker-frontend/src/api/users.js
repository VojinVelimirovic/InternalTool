import { getToken } from "../utils/authStorage";

const BASE_URL = "http://localhost:5000/api/auth";

export const getAllUsers = async () => {
  const token = getToken();

  const response = await fetch(`${BASE_URL}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to fetch users");
  }

  return response.json();
};

export const changeUserRole = async (username, role) => {
  const token = getToken();

  const response = await fetch(`${BASE_URL}/change-role?username=${username}&role=${role}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to change user role");
  }

  return response.json();
};