import { config } from "./config";
import { completion } from "./core";
import { cleanResponseContent } from "@/utils";

export const createPromptCompletion = async (
  systemPrompt: string,
  userPrompt: string | Array<{ type: string; text?: string }>
) => {
  try {
    const response = await completion({
      model: config.MODELS.GPT4,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: typeof userPrompt === "string" ? userPrompt : userPrompt,
        },
      ],
    });
    const content = cleanResponseContent(response.content);
    return { content };
  } catch (error) {
    console.error("Error creating prompt completion:", error);
    throw error;
  }
};
