import axios from 'axios';

const PRIMARY_URL = 'https://api.10plusfashion.shop';
const FALLBACK_URL = 'https://one0-plus-server.onrender.com';

export const axiosSecure = axios.create({
    baseURL: PRIMARY_URL,
    timeout: 20000,
});

// ── Request interceptor (auth token) ──────────────────────────────────────
axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ── Response interceptor with fallback logic ──────────────────────────────
axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config;

        if (!config._retried) {
            const isNetworkError = !error.response;
            const isServerError = error.response?.status >= 500;

            if (isNetworkError || isServerError) {
                config._retried = true;

                // Safely extract relative path
                let path = config.url || '';
                if (path.startsWith('http')) {
                    path = path
                        .replace(PRIMARY_URL, '')
                        .replace(FALLBACK_URL, '');
                }

                // Retry with fallback URL
                return axiosSecure({
                    ...config,
                    baseURL: FALLBACK_URL,
                    url: path,
                });
            }
        }

        return Promise.reject(error);
    }
);

const UseAxiosSecure = () => {
    return axiosSecure;
};

export default UseAxiosSecure;