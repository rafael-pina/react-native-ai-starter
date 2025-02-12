import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "./home";
import { Onboarding } from "./onboarding";
import { Auth } from "./auth";
import { useAuth } from "@/hooks/useAuth";
import { Colors } from "react-native-ui-lib";

const Stack = createNativeStackNavigator();

export enum Screens {
  Home = "Home",
  Onboarding = "Onboarding",
  Auth = "Auth",
}

export type RootParamList = {
  [Screens.Home]: undefined;
  [Screens.Onboarding]: undefined;
  [Screens.Auth]: undefined;
};

export const AppScreens = () => {
  const { user, isLoading } = useAuth();
  const onboardingCompleted = user?.user_metadata?.onboardingCompleted;
  let initialRouteName = user ? Screens.Home : Screens.Auth;

  if (isLoading) {
    return null;
  }

  if (user && !onboardingCompleted) {
    initialRouteName = Screens.Onboarding;
  }

  const screenOptions = {
    headerTitleStyle: { color: Colors.grey20 },
    headerShadowVisible: false,
    headerStyle: { backgroundColor: Colors.white },
  };

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {user ? (
        <>
          <Stack.Screen
            name={Screens.Home}
            component={Home}
            options={{ header: () => null }}
          />
          <Stack.Screen
            name={Screens.Onboarding}
            component={Onboarding}
            options={{ header: () => null }}
          />
        </>
      ) : (
        <Stack.Screen
          name={Screens.Auth}
          component={Auth}
          options={{ header: () => null }}
        />
      )}
    </Stack.Navigator>
  );
};
