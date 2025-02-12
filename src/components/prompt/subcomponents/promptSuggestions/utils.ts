import { Meal } from '@/types';

export const getRecentMealSuggestions = (groupedMeals: Record<string, Meal[]>) => {
  const recentMealNames = Object.values(groupedMeals)
    .flat()
    .slice(0, 10)
    .map((meal: Meal) => meal.name)
    .filter((value, index, self) => self.indexOf(value) === index);

  return recentMealNames;
};
