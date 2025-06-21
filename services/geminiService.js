
const axios = require('axios');


const generateInterviewQA = async (
  role,
  skills,
  difficulty,
  numQuestions = 5
) => {
  const prompt = `
Generate ${numQuestions} interview questions and answers for a ${role} role.
Focus on the following skills: ${skills.join(", ")}.
Difficulty: ${difficulty}.
Return only JSON format like this:
[
  { "question": "...", "modelAnswer": "..." },
  ...
]
`;

  try {
    const response = await axios.post(
      process.env.API,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }
    );

    const text = response.data?.candidates[0]?.content?.parts[0]?.text;

    if (!text) {
      console.error("No content received from Gemini API");
      throw new Error("No response content from Gemini");
    }

    // Extract JSON from Gemini output
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");

    if (start === -1 || end === -1) {
      throw new Error("Could not locate JSON array in response");
    }

    const jsonText = text.substring(start, end + 1);

    return JSON.parse(jsonText);
    // console.log(response.text);
    //   console.log(typeof response)
  } catch (err) {
    console.error("Gemini SDK Error:", err.message);
    throw new Error("Gemini response failed or could not be parsed.");
  }
};

const generateFeedback = async (question, modelAnswer, userAnswer) => {
  const prompt = `
You're an interview coach. A candidate answered this question:

Question: ${question}

Candidate's Answer: ${userAnswer}

Correct/Model Answer: ${modelAnswer}

Give a short, helpful feedback on the candidate's answer — mention strengths, flaws, and suggestions to improve. Respond in 2-3 lines.
`;

  const response = await axios.post(
    process.env.API,
    {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }
  );

  const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text || "Could not generate feedback";
};

const generateResumeFeedback = async (resumeText, role , jobDescription) => {
  const prompt = `
You are an expert resume reviewer for ${role} role.

Analyze the following resume using job description provided and return three clear sections:

1. ✅ Positives — strengths, good points, and what the candidate is doing well
2. ⚠️ Negatives — weaknesses, missing content, or red flags
3. 💡 Suggestions — specific tips to improve the resume for backend developer internships

Here is the job description:
========================
${jobDescription}
========================

Here is the resume:
========================
${resumeText}
========================

Analyse the resume and Format your response like the format described below and put only 2-3 genuine and strong lines in positives, negatives and suggestions:

Format your response like this:



Positives:

- ...

- ...



Negatives:

- ...

- ...



Suggestions:

- ...

- ...

`;

  try {
    const response = await axios.post(
      process.env.API,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    const text =(response.data?.candidates?.[0]?.content?.parts?.[0]?.text);
    // console.log(text)

    // Extract sections from Gemini response
    const positives = extractSection(text, 'Positives');
    const negatives = extractSection(text, 'Negatives');
    const suggestions = extractSection(text, 'Suggestions');

    return { positives, negatives, suggestions };
  } catch (err) {
    console.error("Resume Feedback Error:", err.response?.data || err.message);
    throw new Error("Failed to generate resume feedback.");
  }
};

// Helper: Extracts sections using labels
function extractSection(text, sectionName) {
  const regex = new RegExp(`${sectionName}\\s*:\\s*([\\s\\S]*?)(?=\\n\\w|$)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : "Not found.";
}



module.exports = {
  generateInterviewQA,
  generateFeedback,
  generateResumeFeedback,
};

