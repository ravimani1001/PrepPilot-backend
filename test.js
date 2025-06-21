const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: "AIzaSyAV5ueN--NK12pD-EilvTDIUUYVbhhczBs" });

async function main(role, skills , difficulty) {
     const prompt = `
Generate 3 interview questions and answers for a ${role} role.
Focus on the following skills: ${skills.join(", ")}.
Difficulty: ${difficulty}.
Return only JSON format like this:
[
  { "question": "...", "modelAnswer": "..." },
  ...
]
`

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
    }
  });
  console.log(response.text);
//   console.log(typeof response)
}

main("Backend developer" , ["Node.js" , "express.js"] , "Basic");