import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000"
});

/* AUTH */
export const registerUser = (data) =>
  API.post("/auth/register", data);

export const loginUser = (data) =>
  API.post("/auth/login", data);

/* REVIEW */
export const reviewCode = (data, token) =>
  API.post("/api/review", data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });