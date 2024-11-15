import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios, { type AxiosResponse } from 'axios';

interface User {
  _id: string;
  email: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

const user = ref<User | null>(null);

const API_URL = import.meta.env.VITE_API_URL + '/users';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export function useAuth() {
  const router = useRouter();

  const handleError = (error: unknown): void => {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response);
      if (error.response?.status === 401 || error.response?.status === 403) {
        logout();
      }
    } else if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
  };

  const setTokens = (newAccessToken: string, newRefreshToken: string | null): void => {
    localStorage.setItem('accessToken', newAccessToken);
    if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken);
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      await axiosInstance.post(`${API_URL}`, { email, password });
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response: AxiosResponse<AuthTokens> = await axiosInstance.post(`${API_URL}/login`, {
        email,
        password
      });
      setTokens(response.data.accessToken, response.data.refreshToken);
      await fetchAuthUser();
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const fetchAuthUser = async (): Promise<boolean> => {
    if (!localStorage.getItem('accessToken')) {
      console.error('No access token found');
      return false;
    }
    try {
      const response: AxiosResponse<{ user: User }> = await axiosInstance.get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      user.value = response.data.user;
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    user.value = null;
    router.push('/login');
  };

  axiosInstance.interceptors.response.use(
    (response) => response, // Directly return successful responses.
    async (error) => {
      const originalRequest = error.config;

      // Check if the response status is 401 (Unauthorized) and the request hasn't been retried yet
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.

        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const accessToken = localStorage.getItem('accessToken');

          if (!refreshToken) {
            throw new Error('No refresh token available.');
          }

          const response: AxiosResponse<{ accessToken: string; refreshToken: string }> =
            await axiosInstance.post(
              `${API_URL}/me/refresh`,
              {},
              {
                headers: {
                  'X-Refresh-Token': refreshToken,
                  Authorization: `Bearer ${accessToken}`,
                  'Content-Type': 'application/json'
                }
              }
            );

          const { accessToken: newAccessToken } = response.data;

          // Store the new access and refresh tokens
          localStorage.setItem('accessToken', newAccessToken);

          // Retry the original request with the new access token
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);

          // Clear tokens and handle logout when refresh fails
          await logout();
          return Promise.reject(refreshError);
        }
      }

      // For all other errors, return the error as is
      return Promise.reject(error);
    }
  );

  return {
    axiosInstance,
    user,
    login,
    register,
    fetchAuthUser,
    logout
  };
}
