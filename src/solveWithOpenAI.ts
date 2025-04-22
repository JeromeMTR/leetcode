import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function solveWithOpenAI(problemDescription: string): Promise<string> {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4.1",
      messages: [
        {
          role: "user",
          content: `Solve the following LeetCode problem using TypeScript.
                    Follow the IOCE structure (Input, Output, Constraints, Edge cases).
                    Keep the code clean, readable, and well-commented. ${problemDescription}`,
        },
      ],
    });

    const data = response.data.choices[0].message?.content ?? "";
    const regex = data.match(/```(?:typescript|ts)?\n([\s\S]*?)\n```/i);

    return regex?.[1]?.trim() ?? data.trim();

  } catch (error) {
    console.error("Error fetching response:", error);
    throw new Error("Failed to fetch response from OpenAI.");
  }
}

export default solveWithOpenAI;