import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestHeaders,
    AxiosResponse,
    InternalAxiosRequestConfig,
    RawAxiosRequestHeaders
} from "axios";

class NetworkClient {
    private service: AxiosInstance;

    constructor() {
        const headers: RawAxiosRequestHeaders | AxiosRequestHeaders = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };

        this.service = axios.create({ headers });
        this.service.interceptors.response.use(this.handleSuccess, this.handleError);
        this.service.interceptors.request.use(this.handleRequest);
    }

    handleRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        config.baseURL = process.env.BASE_URL;
        const token = localStorage.getItem("token");
        if (token)
            config.headers.Authorization = "Bearer " + token;
        return config;
    };

    handleSuccess(response: AxiosResponse): AxiosResponse {
        return response;
    }

    handleError = async (error: AxiosError): Promise<AxiosError> => {
        if (error.response && error.response.status === 401) {
            window.alert("You are not authorized.");
            localStorage.removeItem("token");
            window?.location?.reload();
        }
        return Promise.reject(error);
    };

    async get<T>(path: string, headers?: RawAxiosRequestHeaders | AxiosRequestHeaders): Promise<AxiosResponse<T>> {
        const response = await this.service.get<T>(path, { headers });
        return response;
    }

    async patch<T, R = T>(path: string, payload: T, headers?: RawAxiosRequestHeaders | AxiosRequestHeaders): Promise<AxiosResponse<R>> {
        const response = await this.service.request<R>({
            method: "PATCH",
            url: path,
            responseType: "json",
            data: payload,
            headers,
        });
        return response;
    }

    async post<T, R = T>(path: string, payload: T, headers?: RawAxiosRequestHeaders | AxiosRequestHeaders): Promise<AxiosResponse<R>> {
        const response = await this.service.request<R>({
            method: "POST",
            url: path,
            responseType: "json",
            data: payload,
            headers,
        });
        return response;
    }

    async delete<T, R = T>(path: string, payload?: T, headers?: RawAxiosRequestHeaders | AxiosRequestHeaders): Promise<AxiosResponse<R>> {
        const response = await this.service.request<R>({
            method: "DELETE",
            url: path,
            responseType: "json",
            data: payload,
            headers,
        });
        return response;
    }

    async put<T, R = T>(path: string, payload: T, headers?: RawAxiosRequestHeaders | AxiosRequestHeaders): Promise<AxiosResponse<R>> {
        const response = await this.service.request<R>({
            method: "PUT",
            url: path,
            responseType: "json",
            data: payload,
            headers,
        });
        return response;
    }
    async postfile<T, R = T>(path: string, payload: T, headers?: RawAxiosRequestHeaders | AxiosRequestHeaders): Promise<AxiosResponse<R>> {
        const response = await this.service.request<R>({
            method: "POST",
            url: path,
            responseType: "blob",
            data: payload,
            headers,
        });
        return response;
    }
}

export default new NetworkClient();
