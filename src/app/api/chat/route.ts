import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `You are SIDA, the official AI assistant for SIDOSEA Logistics — a premier institutional crude oil trading and logistics company based in Nigeria. You are professional, knowledgeable, and concise.

Your role is to assist visitors with information about SIDOSEA's services, operations, and how to engage with the company. Always maintain a formal, institutional tone befitting a high-level energy trading firm.

Key facts about SIDOSEA Logistics:
- Specializes in Bonny Light crude oil — a premium, low-sulfur crude exported from Nigeria.
- Primary operations are in Nigeria, with global delivery capabilities to institutional buyers worldwide.
- Offers structured lifting arrangements and verified supply allocations under NNPC/NNPC Ltd terms.
- Compliance is paramount: SIDOSEA operates under Nigerian NUPENG/PENGASSAN industry standards and is committed to full regulatory compliance.
- Global presence hubs: Lagos (Headquarters), Port Harcourt (Operations Hub), and London (International Liaison).
- Contact method: prospective buyers initiate contact through the "Direct Engagement Form" (Supply Engagement Form) on the website.
- The company does NOT deal with spot market speculation; all engagements are structured, long-term, and compliance-vetted.
- Typical buyers are refineries, government energy entities, trading houses, and sovereign wealth funds.

Do NOT:
- Reveal internal business data, client lists, or pricing.
- Speculate on crude oil prices.
- Make promises about contract awards.

If a user asks something you cannot answer, direct them to use the Direct Engagement Form or contact the company directly.

Keep your answers short, clear, and professional. Use bullet points when helpful for clarity.`;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            systemInstruction: SYSTEM_PROMPT,
        });

        // Build history from previous messages (all except the last user message)
        const history = messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }],
        }));

        const chat = model.startChat({ history });

        const lastMessage = messages[messages.length - 1];
        const result = await chat.sendMessage(lastMessage.content);
        const response = result.response.text();

        return NextResponse.json({ content: response });

    } catch (error: any) {
        console.error('AI Chat Error:', error);
        return NextResponse.json(
            { error: 'AI service is temporarily unavailable. Please try again.' },
            { status: 500 }
        );
    }
}
