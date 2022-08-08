import axios, { AxiosRequestConfig } from "axios";
import { } from '@food-review-demo/api-interfaces';
import { environment } from "../environments/environment";

export class BaseAPI {
    static getConfig(): AxiosRequestConfig {
        return {
            baseURL: environment.apiUrl,
        }
    }

    static async get<TData = any>(path: string) {
        return axios.get<TData>(path, this.getConfig())
    }

    static async post<TData = any>(path: string, payload: any) {
        return axios.post<TData>(path, payload, this.getConfig())
    }
}

export class API {
    static async submitSurvey() {
        return BaseAPI.post("/submit", {msg: "Hello!"})
    }
}