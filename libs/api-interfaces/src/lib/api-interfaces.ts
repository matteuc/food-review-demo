import { BreakfastRating, SurveyResponse } from './models';

export type SubmitSurveyPayload = {
  survey: {
    userId: string,
    breakfastItem: string,
    breakfastRating: BreakfastRating
  }
};

export type SubmitSurveyResponse = {
  responseId: string;
};

export type GetSurveyDataPayload = {};

export type GetSurveyDataResponse = {
  responses: Array<SurveyResponse>;
};
