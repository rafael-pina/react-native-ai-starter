import { User } from 'react-native-auth0';
import { Meal } from '.';

export type SubscriptionStatus = 'active' | 'inactive' | 'pending' | 'cancelled' | 'expired';

export type Subscription = {
  subscriptionStart: string;
  tier: string;
  lastPayment: string;
  nextPayment: string;
  amount: number;
  currency: string;
  status: SubscriptionStatus;
};

export interface UserMetadata {
  meals: Meal[];
  subscription?: Subscription;
  onboardingCompleted?: boolean;
  userInfo?: any; // This stores the user info from onboarding
  name?: string;
}

export type UserWithMetadata = User & {
  user_metadata: UserMetadata;
};

export type Auth0User = User;
