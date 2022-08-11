import { BreakfastRating } from '@food-review-demo/api-interfaces';

export const BREAKFAST_RATING_COLOR_MAP: Record<BreakfastRating, string> = {
  [BreakfastRating.Bad]: 'red',
  [BreakfastRating.OK]: 'orange',
  [BreakfastRating.Good]: 'green',
};
