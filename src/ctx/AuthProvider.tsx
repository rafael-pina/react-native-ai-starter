import { ReactNode } from "react";
import { Auth0Provider } from "react-native-auth0";

interface AuthProviderProps {
  children: ReactNode;
}

const AUTH0_DOMAIN = "ADD_YOUR_AUTH0_DOMAIN";
const AUTH0_CLIENT_ID = "ADD_YOUR_AUTH0_CLIENT_ID";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
      {children}
    </Auth0Provider>
  );
};
