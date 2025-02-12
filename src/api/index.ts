import OpenAI from "openai";
import { config } from "./config";
import { transcription, completion, submitImage } from "./core";

export const openai = new OpenAI({
  apiKey: config.API_KEY,
});

export * from "./core";
export * from "./config";

export const api = {
  gpt: {
    completion,
    transcription,
    submitImage,
  },
};
