import "react-native-url-polyfill/auto";
import "react-native-get-random-values";

import { AppScreens } from "@/screens";
import { NavigationContainer } from "@react-navigation/native";
import { Auth0Provider } from "react-native-auth0";
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from "@/constants/auth0";
import { UIProvider } from "@/ctx/UIProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatGPTProvider } from "@/ctx/ChatGPTProvider";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
        <UIProvider>
          <ChatGPTProvider>
            <NavigationContainer>
              <AppScreens />
            </NavigationContainer>
          </ChatGPTProvider>
        </UIProvider>
      </Auth0Provider>
    </QueryClientProvider>
  );
}
