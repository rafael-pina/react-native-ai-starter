import {
  AUTH0_DEFAULT_SCOPE,
  AUTH0_MANAGEMENT_AUDIENCE,
} from "@/constants/auth0";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { Button, Text, View, Colors } from "react-native-ui-lib";
import { useAuth } from "@/hooks/useAuth";

export const Auth: FC = () => {
  const {
    authorize,
    clearSession,
    auth0User: user,
    error,
    isLoading,
  } = useAuth();

  const onLogin = async () => {
    try {
      await authorize({
        scope: AUTH0_DEFAULT_SCOPE,
        audience: AUTH0_MANAGEMENT_AUDIENCE,
      });
    } catch (e) {
      console.error("Error logging in:", e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.error("Log out cancelled");
    }
  };

  if (isLoading) {
    return null;
  }

  const loggedIn = user !== undefined && user !== null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to RN Boilerplate</Text>
        <Text style={styles.subtitle}>
          A modern React Native boilerplate with Auth0 and ChatGPT integration
        </Text>

        <Button
          label={loggedIn ? "Log Out" : "Get Started"}
          onPress={loggedIn ? onLogout : onLogin}
          style={styles.button}
          backgroundColor={Colors.blue30}
        />
        {loggedIn && (
          <Text style={styles.userText}>Logged in as {user.name}</Text>
        )}
        {error && <Text style={styles.error}>{error.message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: Colors.grey20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: Colors.grey40,
    lineHeight: 22,
  },
  button: {
    height: 50,
    borderRadius: 25,
    marginTop: 20,
    width: "100%",
  },
  error: {
    color: Colors.red30,
    marginTop: 10,
    textAlign: "center",
  },
  userText: {
    marginTop: 10,
    color: Colors.grey40,
  },
});
