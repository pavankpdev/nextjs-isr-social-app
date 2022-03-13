import axios, {AxiosRequestConfig} from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_EP,
});

axiosInstance.interceptors.request.use(
    function (config: AxiosRequestConfig) {
        if ((config?.headers?.Authorization as string | undefined)?.includes("Bearer")) {
            return config;
        }

        if (localStorage.getItem("pride")) {
            const { token } = JSON.parse(localStorage.getItem("pride") as string);
            (config.headers as any).Authorization = token;
            return config;
        }

        // This will throw 401 error
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status == 401) {
            // window.location.href = "/auth"
            return;
        }

        return Promise.reject(error);
    }
);

export const setHeaders = (key: string, value: string) => {
    (axiosInstance.defaults as any).headers[key] = value;
}

export default axiosInstance;