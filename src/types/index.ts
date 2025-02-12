export type NutritionalInfo = {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
  sugar: number;
};

export type MealContent = {
  ingredient: string;
  amount: number;
  unit: string;
  calories: number;
  caloriesPer100: number;
};

export type Meal = {
  name: string;
  id: string;
  date: string;
  nutritionalInfo: NutritionalInfo;
  blood_sugar_impact?: {
    risk: "low" | "medium" | "high";
    explanation: string;
  };
  contents: MealContent[];
};

export type DailyGoal = {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
  sugar: number;
};

export type BloodTestMetric = {
  name: string;
  value: string;
  unit: string;
  normalRange: string;
  status: "normal" | "high" | "low" | "critical";
  recommendation: string;
};

export type BloodTestResult = {
  id: string;
  date: string;
  metrics: BloodTestMetric[];
  summary: string;
  urgentConcerns: string | null;
  lifestyleRecommendations: string[];
  imageUri: string;
};
