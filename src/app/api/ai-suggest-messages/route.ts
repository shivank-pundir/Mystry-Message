import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
    try {
        const { context } = await request.json();
const prompt = `
Generate exactly 5 open-ended and engaging questions for an anonymous social messaging platform.

The questions should:
- Be suitable for a diverse audience.
- Encourage friendly interaction and conversation.
- Be interesting and curiosity-provoking.
- Focus on universal and relatable themes.
- Avoid personal, private, sensitive, political, sexual, or potentially uncomfortable topics.
- Be natural and conversational.
- Be short enough to use as an anonymous message.
- Do not repeat similar questions.

Examples of good questions:
- What's a hobby you've recently started?
- If you could have dinner with any historical figure, who would it be?
- What's a simple thing that makes you happy?

Return ONLY a valid JSON array containing exactly 5 strings.

Example:
[
  "What's a hobby you've recently started?",
  "If you could learn any skill instantly, what would it be?",
  "What's a simple thing that always makes you happy?",
  "What's a place you'd love to visit someday?",
  "What's something new you'd like to try?"
]
`;

        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite",
            contents: prompt,
        });

        const text = response.text;

        if (!text) {
            return Response.json(
                {
                    success: false,
                    message: "AI did not return any suggestions",
                },
                { status: 500 }
            );
        }

        const suggestions = JSON.parse(text);

        return Response.json(
            {
                success: true,
                suggestions,
            },
            { status: 200 }
        );
    } catch (error) {
       
        console.error("Gemini API error:", error);

        return Response.json(
            {
                success: false,
                message: "Failed to generate AI suggestions",
            },
            { status: 500 }
        );
    }
}