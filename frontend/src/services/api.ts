import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Update this to your Django backend URL

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async (username: string, password: string): Promise<string> => {
  const response = await api.post('/login/', { username, password });
  const token = response.data.access;
  localStorage.setItem('token', token);
  return token;
};

export const signup = async (username: string, password: string): Promise<string> => {
  await api.post('/signup/', { username, password });
  return login(username, password);
};

export const fetchDocuments = async () => {
  const response = await api.get('/documents/');
  return response.data;
};

export const uploadDocument = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', file.name);
  const response = await api.post('/documents/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export default api;