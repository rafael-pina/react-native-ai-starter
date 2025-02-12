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

export const completion = async (prompt: string, systemPrompt: string) => {
  const response = await openai.chat.completions.create({
    model: config.MODELS.GPT4,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
  });
  return response.choices[0].message;
};

export const createCompletion = async ({
  model = config.MODELS.GPT35,
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

export const submitImage = async (
  prompt: string,
  base64Image: string
): Promise<any> => {
  try {
    const response = await openai.chat.completions.create({
      model: config.MODELS.GPT4,
      messages: [
        {
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
        },
      ],
      max_tokens: config.MAX_TOKENS.DEFAULT,
    });

    return response.choices[0].message;
  } catch (error) {
    console.error("Error analyzing food image:", error);
    return null;
  }
};
