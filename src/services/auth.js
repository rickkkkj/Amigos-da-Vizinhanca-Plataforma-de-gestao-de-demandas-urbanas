import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export async function login(email, senha) {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    senha,
  });

  return response.data; 
}

export function getUser() {
  const u = localStorage.getItem("user");
  return u ? JSON.parse(u) : null;
}

export function getUserId() {
  const u = getUser();
  return u?.id || null;
}

export function logout() {
  localStorage.removeItem("user");
}
