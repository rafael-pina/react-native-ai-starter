// Constants
export const config = {
  BASE_URL: "https://api.openai.com/v1",
  API_KEY: "",
  MODELS: {
    GPT4: "gpt-4o",
    GPT35: "gpt-3.5-turbo",
    WHISPER: "whisper-1",
  },
  MAX_TOKENS: {
    DEFAULT: 2000,
  },
} as const;
