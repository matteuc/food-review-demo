export enum BreakfastRating {
    Bad = 'Bad',
    Ok = 'Ok',
    Good = 'Good',
  }

export type SurveyResponse = {
    userId: string,
    breakfastItem: string,
    breakfastRating: BreakfastRating
}