import { ChatCompletionMessage } from "openai/resources/chat/completions";
import { config } from "./config";
import { openai } from "./index";

type Message = {
  role: "system" | "user" | "assistant";
  content:
    | string
    | Array<{ type: string; text?: string; image_url?: { url: string } }>;
};

type CompletionOptions = {
  model?: string;
  maxTokens?: number;
  messages: Message[];
};

export const completion = async ({
  model = config.MODELS.GPT4,
  maxTokens = config.MAX_TOKENS.DEFAULT,
  messages,
}: CompletionOptions) => {
  const response = await openai.chat.completions.create({
    model,
    messages: messages as any,
    max_tokens: maxTokens,
  });
  return response.choices[0].message;
};

export const transcription = (uri: string) => {
  const formData = new FormData();
  formData.append("file", {
    name: "recording.m4a",
    type: "audio/m4a",
    uri,
  } as any);
  formData.append("model", config.MODELS.WHISPER);

  return fetch(`${config.BASE_URL}/audio/transcriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.API_KEY}`,
      Accept: "application/json",
      "User-Agent": "OpenAI/JS 4.14.2",
    },
    body: formData,
  }).then((response) => response.json());
};

export const submitImage = async (
  prompt: string,
  base64Image: string
): Promise<ChatCompletionMessage | null> => {
  try {
    const imageMessage = {
      role: "user",
      content: [
        { type: "text", text: prompt },
        {
          type: "image_url",
          image_url: {
            url: `data:image/jpeg;base64,${base64Image}`,
          },
        },
      ],
    } as Message;
    const response = await completion({
      messages: [imageMessage],
    });

    return response;
  } catch (error) {
    console.error("Error analyzing food image:", error);
    return null;
  }
};
