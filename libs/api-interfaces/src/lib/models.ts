export enum BreakfastRating {
    Bad = 'Bad',
    Ok = 'Ok',
    Good = 'Good',
  }

export type SurveyResponse = {
    responseId: string,
    userId: string,
    breakfastItem: string,
    breakfastRating: BreakfastRating
    createdAt: Date,
}