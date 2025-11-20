// src/infrastructure/api/apiClient.ts
import axios from 'axios';

// Configure your FastAPI backend URL
const API_BASE_URL = 'http://localhost:8000'; // Change this to your backend URL

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Only enable if using cookies/sessions
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const message = error.response.data?.detail || 'An error occurred';
            return Promise.reject(new Error(message));
        } else if (error.request) {
            // The request was made but no response was received
            return Promise.reject(new Error('No response from server'));
        } else {
            // Something happened in setting up the request that triggered an Error
            return Promise.reject(error);
        }
    }
);

export default apiClient;