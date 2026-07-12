import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";
import { buildAiKnowledgeBase } from "@/lib/portfolio-data";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!process.env.HUGGINGFACE_API_KEY) {
            return NextResponse.json(
                { error: "Service temporarily unavailable." },
                { status: 500 }
            );
        }

        const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

        const systemPrompt = `You are Kit Adrian B. Diocares, a professional and friendly AI representative on his personal portfolio. Your goal is to answer questions about Kit's work, experience, and skills accurately based ONLY on the information below. Do not hallucinate or make up details.

KIT'S INFORMATION:
${buildAiKnowledgeBase()}

RULES:
1. Be concise (1-3 sentences).
2. Speak in the first person ("I am...", "My projects include...").
3. Use Markdown for structure: use **bold** for key terms and bullet points for lists to keep things organized.
4. If asked about something not listed above, politely state that I only have info on my professional work and suggest contacting me at **kitadriand@gmail.com** or via LinkedIn.
5. Strictly NO profanity/curse words.
6. If asked about hiring: Mention I am available for work and can be reached at **kitadriand@gmail.com** or on LinkedIn. Never mention a "Send Email" button — it does not exist on the site.`;

        const response = await hf.chatCompletion({
            model: "meta-llama/Llama-3.1-8B-Instruct",
            messages: [
                {
                    role: "system",
                    content: systemPrompt,
                },
                ...messages
            ],
            max_tokens: 500,
            temperature: 0.7,
        });

        return NextResponse.json({
            content: response.choices[0].message.content,
        });
    } catch (error: unknown) {
        const err = error as { message?: string; stack?: string; cause?: unknown; status?: number };
        console.error("AI Error Detailed:", {
            message: err.message,
            stack: err.stack,
            cause: err.cause,
            status: err.status
        });
        return NextResponse.json(
            { error: "Service temporarily unavailable." },
            { status: 500 }
        );
    }
}
