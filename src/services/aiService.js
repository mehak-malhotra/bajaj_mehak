
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function getSingleWordAnswer(question) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const genAI = new GoogleGenerativeAI(apiKey.trim());
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Answer the following question with ONLY a single word. No punctuation, no explanation, no extra text. Just one word.

Question: ${question}`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  if (!text || typeof text !== "string") {
    throw new Error("Empty or invalid response from AI");
  }

  const singleWord = text.trim().replace(/[.,!?;:'"]/g, "").split(/\s+/)[0];
  return singleWord || text.trim();
}

module.exports = { getSingleWordAnswer };
