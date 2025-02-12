import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    withCredentials: true,
});

// Flag to track if we're currently refreshing the token
let isRefreshing = false;
// Store pending requests
let failedQueue: {
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is not 401 or the request has already been retried, reject
        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        if (!isRefreshing) {
            isRefreshing = true;
            originalRequest._retry = true;

            try {
                const response = await api.post('/auth/refresh');
                const { accessToken } = response.data.data;

                isRefreshing = false;

                // Process any requests that were waiting
                processQueue(null, accessToken);

                // Update the original request with new token
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                isRefreshing = false;
                processQueue(refreshError as Error);

                // If refresh token is invalid, redirect to login
                if (error.response?.status === 401) {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }

        // If we're already refreshing, add request to queue
        return new Promise((resolve, reject) => {
            failedQueue.push({
                resolve: (token) => {
                    if (token) {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    }
                    resolve(api(originalRequest));
                },
                reject: (err) => {
                    reject(err);
                },
            });
        });
    }
);

export default api;