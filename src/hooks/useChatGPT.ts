import { api } from "@/api";
import { Meal } from "@/types";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

const prompts = {
  system: "add your system prompt here",
};

type useChatGPTHook = {
  prompt: string;
  setPrompt: (prompt: string) => void;
  response: string;
  submit: (content?: string) => Promise<Meal | null | undefined>;
  loading: boolean;
  submitting: boolean;
  submitVoice: (uri: string) => Promise<Meal | null | undefined>;
  transcription: (uri: string) => Promise<string>;
  submitImage: (prompt: string, base64Image: string) => Promise<any>;
};

type CompletionResponse = {
  content: string;
};

type TranscriptionResponse = {
  text: string;
};

export const useChatGPT = (): useChatGPTHook => {
  const [state, setState] = useState({
    response: "",
    prompt: "",
    submitting: false,
  });

  const resetResponse = () => {
    setState((prev) => ({ ...prev, response: "" }));
  };

  const resetPrompt = () => {
    setState((prev) => ({ ...prev, prompt: "" }));
  };

  const setSubmitting = (value: boolean) => {
    setState((prev) => ({ ...prev, submitting: value }));
  };

  useEffect(() => {
    resetResponse();
  }, [state.prompt]);

  const completionMutation = useMutation<CompletionResponse, Error, string>({
    mutationFn: async (content: string) => {
      const response = await api.gpt.completion({
        messages: [{ role: "user", content }],
      });
      return { content: response.content || "" };
    },
  });

  const transcriptionMutation = useMutation<
    TranscriptionResponse,
    Error,
    string
  >({
    mutationFn: async (uri: string) => {
      return api.gpt.transcription(uri);
    },
  });

  const handleResponse = async (response: CompletionResponse) => {
    setState((prev) => ({ ...prev, response: response.content ?? "" }));
    const meal = JSON.parse(response.content ?? "{}") as Meal;
    resetPrompt();
    return meal;
  };

  const withErrorHandling = async <T>(
    operation: () => Promise<T>,
    defaultValue: T
  ): Promise<T> => {
    try {
      return await operation();
    } catch (e) {
      console.error("error:", { e });
      return defaultValue;
    }
  };

  const withSubmitting = async <T>(operation: () => Promise<T>): Promise<T> => {
    resetResponse();
    setSubmitting(true);
    try {
      return await operation();
    } finally {
      setSubmitting(false);
    }
  };

  async function submit(content?: string) {
    return withSubmitting(async () => {
      const response = await completionMutation.mutateAsync(
        content ?? state.prompt
      );
      return handleResponse(response);
    });
  }

  async function transcription(uri: string) {
    return withErrorHandling(async () => {
      const { text: content } = await transcriptionMutation.mutateAsync(uri);
      setState((prev) => ({ ...prev, response: content ?? "" }));
      resetPrompt();
      return content;
    }, "");
  }

  async function submitVoice(uri: string) {
    return withSubmitting(async () => {
      const { text: content } = await transcriptionMutation.mutateAsync(uri);
      const response = await completionMutation.mutateAsync(content);
      return handleResponse(response);
    });
  }

  const submitImage = async (prompt: string, base64Image: string) => {
    return withSubmitting(async () => {
      return await withErrorHandling(
        async () => api.gpt.submitImage(prompt, base64Image),
        null
      );
    });
  };

  return {
    prompt: state.prompt,
    setPrompt: (prompt: string) => setState((prev) => ({ ...prev, prompt })),
    response: state.response,
    submit,
    loading: completionMutation.isPending || transcriptionMutation.isPending,
    submitting: state.submitting,
    submitVoice,
    transcription,
    submitImage,
  };
};
