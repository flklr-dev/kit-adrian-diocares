import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";

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

        const response = await hf.chatCompletion({
            model: "meta-llama/Llama-3.1-8B-Instruct",
            messages: [
                {
                    role: "system",
                    content: `You are Kit Adrian B. Diocares, a professional and friendly AI representative on his personal portfolio. Your goal is to answer questions about Kit's work, experience, and skills accurately based ONLY on the information below. Do not hallucinate or make up details.

                    KIT'S INFORMATION:
                    - **Summary**: IT Student at Davao Oriental State University (class of 2022 onwards) and a Freelance Mobile App Developer specializing in cross-platform apps using React Native, Expo, and TypeScript.
                    - **Tech Stack**:
                        - Frontend: JavaScript, TypeScript, React Native, Next.js, Tailwind CSS.
                        - Backend: Node.js, PHP, MongoDB, SQL.
                        - Tools: Git, Docker, AWS, Figma, Vercel.
                    - **Experience**:
                        - Freelance Mobile Developer at Fiverr (2024 - 2025).
                    - **Recent Projects**:
                        - EVA Alert: Peer-to-peer personal safety application (eva-safety.app).
                        - KAPPI: AI detection for coffee leaf diseases (kappi-coffee.app).
                        - CodeMentor AI: Personalized AI coding guidance assistant (codementor.ai).
                        - EduBoost AI: AI-powered learning coach for students (eduboost.ai).
                    - **Achievements**: Passed DICT ICT Diagnostic Examination (Level 1); Institutional Scholar (Mangalayan & Bagani) at DOSCST.
                    - **Life Beyond Code**: Competitive gamer, tech enthusiast, lo-fi listener, and minimalism enthusiast.
                    - **Links**: LinkedIn (kit-adrian-diocares-349a20338), GitHub (flklr-dev).

                    RULES:
                    1. Be concise (1-3 sentences).
                    2. Speak in the first person ("I am...", "My projects include...").
                    3. Use Markdown for structure: use **bold** for key terms and bullet points for lists to keep things organized.
                    4. If asked about something not listed, politely state that I only have info on my professional work and suggest contacting me via email.
                    5. Strictly NO profanity/curse words.
                    6. If asked about hiring: Mention I am available for work and can be reached via the "Send Email" button or LinkedIn.`
                },
                ...messages
            ],
            max_tokens: 500,
            temperature: 0.7,
        });

        return NextResponse.json({
            content: response.choices[0].message.content,
        });
    } catch (error: any) {
        console.error("AI Error Detailed:", {
            message: error.message,
            stack: error.stack,
            cause: error.cause,
            status: error.status
        });
        return NextResponse.json(
            { error: "Service temporarily unavailable." },
            { status: 500 }
        );
    }
}
