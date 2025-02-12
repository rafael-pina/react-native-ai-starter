import { View, Text } from "react-native-ui-lib";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Prompt } from "@/components/prompt/Prompt";
import { useUI } from "@/ctx/UIProvider";
import { styles } from "./styles";
import { useChatGPTCtx } from "@/ctx/ChatGPTProvider";

export const Home = () => {
  const { isWritingPrompt } = useUI();
  const { prompt, setPrompt, submit } = useChatGPTCtx();

  let content = (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeTitle}>Welcome to RN Boilerplate</Text>
      <Text style={styles.welcomeSubtitle}>
        Ask me anything using the prompt below
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>{content}</View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboard}
      >
        <Prompt />
      </KeyboardAvoidingView>
    </View>
  );
};
