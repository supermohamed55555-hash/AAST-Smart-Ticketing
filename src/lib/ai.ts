import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function categorizeTicket(description: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are an AI assistant for a university ticketing system. Categorize the following issue description into one of these departments: Student Affairs, IT Support, Financial Department, Library Services. Return only the department name.",
      },
      {
        role: "user",
        content: description,
      },
    ],
  });

  return response.choices[0].message.content;
}

export async function summarizeTicket(description: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Summarize the following university issue description into a short phrase (max 5 words).",
      },
      {
        role: "user",
        content: description,
      },
    ],
  });

  return response.choices[0].message.content;
}

export async function predictTraffic(historicalData: any) {
  // Logic to predict traffic using historical trends
  // This is a simplified version for the demo
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Analyze the historical ticketing data and predict the peak hours for tomorrow. Return a JSON object with 'peak_hour', 'expected_volume', and 'congestion_level' (Low/Medium/High).",
      },
      {
        role: "user",
        content: JSON.stringify(historicalData),
      },
    ],
    response_format: { type: "json_object" },
  });

  return JSON.parse(response.choices[0].message.content || "{}");
}
