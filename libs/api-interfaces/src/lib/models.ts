export enum BreakfastRating {
    Bad = 'Bad',
    OK = 'OK',
    Good = 'Good',
  }

export type SurveyResponse = {
    responseId: string,
    userId: string,
    breakfastItem: string,
    breakfastRating: BreakfastRating
    createdAt: Date,
}