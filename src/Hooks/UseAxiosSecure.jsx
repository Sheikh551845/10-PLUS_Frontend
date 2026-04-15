import axios from 'axios';

const PRIMARY_URL = 'https://api.10plusfashion.shop';
const FALLBACK_URL = 'https://api.10plusfashion.shop';

export const axiosSecure = axios.create({
    baseURL: PRIMARY_URL,
    timeout: 20000, // fail within 20s instead of waiting 30s+
});

// If the primary URL fails, automatically retry once using the fallback URL
axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error.config;
        // Only retry once and only on network errors or 5xx responses
        if (!config._retried) {
            const isNetworkError = !error.response;
            const isServerError = error.response?.status >= 500;
            if (isNetworkError || isServerError) {
                config._retried = true;
                config.baseURL = FALLBACK_URL;
                // Clear the full URL so axios rebuilds it from baseURL + url path
                config.url = config.url.replace(PRIMARY_URL, '');
                return axiosSecure(config);
            }
        }
        return Promise.reject(error);
    }
);

const UseAxiosSecure = () => {
    return axiosSecure;
};

export default UseAxiosSecure;