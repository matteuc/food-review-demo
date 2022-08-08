import { GetSurveyDataPayload, GetSurveyDataResponse, SubmitSurveyPayload, SubmitSurveyResponse } from "./api-interfaces"

interface ApiType<Response, Payload> {
    response: Response,
    payload: Payload,
}

export type SubmitSurveyApiType = ApiType<SubmitSurveyResponse, SubmitSurveyPayload>

export type GetSurveyDataApiType = ApiType<GetSurveyDataResponse, GetSurveyDataPayload>

