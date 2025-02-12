import { createContext, FC, ReactNode, useContext, useMemo } from "react";
import { useChatGPT } from "@/hooks/useChatGPT";
import { Meal } from "@/types";

type UseChatGPTCtxType = {
  prompt: string;
  setPrompt: (prompt: string) => void;
  response: string;
  submit: () => Promise<Meal | null | undefined>;
  loading: boolean;
  submitting: boolean;
  submitVoice: (uri: string) => Promise<Meal | null | undefined>;
  submitImage: (prompt: string, base64Image: string) => Promise<any>;
};

export const ChatGPTContext = createContext({
  prompt: "",
  setPrompt: () => {},
  response: "",
  submit: async () => null,
  loading: false,
  submitting: false,
  submitVoice: async () => null,
  submitImage: async () => null,
} as UseChatGPTCtxType);

interface ChatGPTProviderProps {
  children: ReactNode;
}

export const ChatGPTProvider: FC<ChatGPTProviderProps> = ({ children }) => {
  const {
    prompt,
    setPrompt,
    response,
    submit,
    loading,
    submitting,
    submitVoice,
    submitImage,
  } = useChatGPT();

  const value = useMemo(
    () => ({
      prompt,
      setPrompt,
      response,
      submit,
      loading,
      submitting,
      submitVoice,
      submitImage,
    }),
    [
      prompt,
      setPrompt,
      response,
      submit,
      loading,
      submitting,
      submitVoice,
      submitImage,
    ]
  );

  return (
    <ChatGPTContext.Provider value={value}>{children}</ChatGPTContext.Provider>
  );
};

export const useChatGPTCtx = (): UseChatGPTCtxType =>
  useContext(ChatGPTContext);
