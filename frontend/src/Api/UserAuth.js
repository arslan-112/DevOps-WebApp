import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/users`;

export const userLogin = async (credentials) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
    credentials
  );
  return response.data.data;
};

export const userSignUp = async (userDetails) => {
  const response = await axios.post(`${API_URL}/Customer`, userDetails);
  return response.data.data;
};
