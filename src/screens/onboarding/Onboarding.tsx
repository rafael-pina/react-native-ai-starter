import { View, Text, StyleSheet } from "react-native";
import { Button, Colors } from "react-native-ui-lib";
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../Screens";
import { useAuth0 } from "react-native-auth0";
import { useStorage } from "@/hooks/useStorage";

export const Onboarding = () => {
  const { navigate } = useNavigation<any>();
  const { user, getCredentials } = useAuth0();
  const { setItem } = useStorage("onboarding");

  async function onFinish() {
    if (user) {
      const credentials = await getCredentials();
      if (credentials?.accessToken) {
        // Update user metadata to mark onboarding as complete
        await setItem({ completed: true });
      }
    }

    navigate(Screens.Home);
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to the App!</Text>
        <Text style={styles.subtitle}>
          This is a boilerplate onboarding screen. Customize it based on your
          needs.
        </Text>
        <Button
          label="Get Started"
          onPress={onFinish}
          backgroundColor={Colors.blue30}
          style={styles.button}
        />
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
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.grey20,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.grey40,
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    width: "100%",
    height: 50,
  },
});
