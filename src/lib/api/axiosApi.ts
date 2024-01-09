import axios from 'axios';

export const BASE_URL = 'http://localhost:8080/api/v1';

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export { axiosPublic, axiosPrivate };
