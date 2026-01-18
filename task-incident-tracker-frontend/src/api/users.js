import { API_BASE_URL } from "../config/api";
import { getToken } from "../utils/authStorage";

const API_URL = `${API_BASE_URL}/auth`;

export const getAllUsers = async () => {
  const token = getToken();

  const response = await fetch(`${API_URL}`, {
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

  const response = await fetch(`${API_URL}/change-role?username=${username}&role=${role}`, {
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