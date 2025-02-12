import { Meal } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export function getTotalNutritionalInfo(meals: Meal[]) {
  const calories = meals.reduce((acc, meal) => acc + meal.nutritionalInfo.calories, 0);
  const carbs = meals.reduce((acc, meal) => acc + meal.nutritionalInfo.carbs, 0);
  const fat = meals.reduce((acc, meal) => acc + meal.nutritionalInfo.fat, 0);
  const protein = meals.reduce((acc, meal) => acc + meal.nutritionalInfo.protein, 0);
  const sugar = meals.reduce((acc, meal) => acc + meal.nutritionalInfo.sugar, 0);

  return { calories, carbs, fat, protein, sugar };
}

export function createNewMeal(meal: Meal) {
  return {
    ...meal,
    id: uuidv4(),
    date: new Date().toISOString(),
  };
}
