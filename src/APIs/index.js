import axios from 'axios';

export const baseURL = `http://localhost:7575`;

const API = axios.create({
  baseURL,
});

// ? what is it for?
API.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default API;
