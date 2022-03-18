import axios, {AxiosRequestConfig} from "axios";

export const getAxiosInstance = (isSSR = false) => {

    const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_EP,
    });

    axiosInstance.interceptors.request.use(
        function (config: AxiosRequestConfig) {

            if (isSSR) {
                return config;
            }

            if ((config?.headers?.Authorization as string | undefined)?.includes("Bearer")) {
                return config;
            }

            if (localStorage.getItem("isr")) {
                const { token } = JSON.parse(localStorage.getItem("isr") as string);
                (config.headers as any).Authorization = `Bearer ${token}`;
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
            if(isSSR){
                return Promise.reject(error)
            }
            if (!window.location.pathname.includes('/auth') && error.response?.status == 401) {

                window.location.href = "/auth"
                return;
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance
}

export default getAxiosInstance;