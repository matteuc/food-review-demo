import { SurveyResponse } from './models';

export type SubmitSurveyPayload = {
  survey: SurveyResponse
};

export type SubmitSurveyResponse = {
  responseId: string;
};

export type GetSurveyDataPayload = {};

export type GetSurveyDataResponse = {
  responses: Array<SurveyResponse>;
};
