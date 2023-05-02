import axios from 'axios';

export const baseURL = import.meta.env.VITE_API_URL;

const API = axios.create({
  baseURL,
});

// ? what is it for?
API.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default API;
