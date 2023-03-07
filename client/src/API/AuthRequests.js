import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const login = async (formdata) =>
  await API.post("/auth/signin", formdata);
export const register = (formdata) => API.post("/auth/signup", formdata);
export const forgetPassword = async (formdata) =>
  await API.post("/auth/forget-password", formdata);
export const resetPassword = async (formdata) =>
  await API.post("/auth/reset-password", formdata);
