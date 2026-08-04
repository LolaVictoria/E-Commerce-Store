import axios from "axios";
const api = axios.create({
    baseURL: "https://e-commerce-backend-production-2580.up.railway.app",
    headers: {
        "Content-Type": "application/json",
    },
})


    // Attach JWT automatically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        const method = config.method?.toLowerCase();
        const isPublicProductRequest =
            method === "get" && /^\/products(?:\/\d+)?\/?$/.test(config.url ?? "");

        // The product catalogue is public. Sending a bearer token here makes
        // the backend reject the request with 403 (and can trigger a CORS
        // preflight in browsers), even when the token is otherwise valid.
        if (token && !isPublicProductRequest) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

//Handle expired tokens
api.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response?.status === 401) {

            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("name");
            localStorage.removeItem("role");

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;
