import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  ApiRoutes,
  GetSurveyDataApiType,
  SubmitSurveyApiType,
} from '@food-review-demo/api-interfaces';
import { environment } from '../environments/environment';

export class BaseAPI {
  static getConfig(): AxiosRequestConfig {
    return {
      baseURL: environment.apiUrl,
    };
  }

  static async get<TData = any, TPayload = any>(
    path: string,
    params: TPayload
  ) {
    return axios.get<TData>(path, { ...this.getConfig(), params });
  }

  static async post<TData = any, TPayload = any>(
    path: string,
    payload: TPayload
  ) {
    return axios.post<TData, AxiosResponse<TData, any>, TPayload>(
      path,
      payload,
      this.getConfig()
    );
  }
}

export class API {
  static async submitSurvey(payload: SubmitSurveyApiType['payload']) {
    return (
      await BaseAPI.post<
        SubmitSurveyApiType['response'],
        SubmitSurveyApiType['payload']
      >(ApiRoutes.SubmitSurvey, payload)
    ).data;
  }

  static async getSurveyData(payload: GetSurveyDataApiType['payload']) {
    return (
      await BaseAPI.get<
        GetSurveyDataApiType['response'],
        GetSurveyDataApiType['payload']
      >(ApiRoutes.GetSurveyData, payload)
    ).data;
  }
}
