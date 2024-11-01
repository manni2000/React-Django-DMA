import axios from 'axios';
import { API_URL } from '../config'; // Import from config.ts

const api = axios.create({
  baseURL: `${API_URL}/api`, // Use API_URL from config
});

// Configure axios to always use the latest token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    const response = await api.post('/login/', { username, password });
    const token = response.data.access;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

export const signup = async (
  username: string,
  password: string
): Promise<string> => {
  try {
    const response = await api.post('/signup/', { username, password });
    const token = response.data.access;
    localStorage.setItem('token', token);
    return token;
  } catch (error: any) {
    if (error.response?.data) {
      const errorMessage = Object.values(error.response.data).join(', ');
      throw new Error(errorMessage);
    }
    throw new Error('Failed to create account');
  }
};

export const fetchDocuments = async () => {
  try {
    const response = await api.get('/documents/');
    const documents = response.data.map((doc: any) => ({
      ...doc,
      file: doc.file.startsWith('http') ? doc.file : `${API_URL}${doc.file}`,
    }));
    return documents;
  } catch (error: any) {
    console.error('Error fetching documents:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      throw new Error('Please login to view documents');
    }
    throw new Error('Failed to fetch documents');
  }
};


export const uploadDocument = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    const response = await api.post('/documents/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error uploading document:', error.response?.data || error.message);
    throw new Error('Failed to upload document');
  }
};

export default api;