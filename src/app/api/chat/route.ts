import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are SIDA, the official AI assistant for SIDOSEA Logistics — a premier institutional crude oil trading and logistics company based in Nigeria. You are professional, knowledgeable, and concise.

Your role is to assist visitors with information about SIDOSEA's services, operations, and how to engage with the company. Always maintain a formal, institutional tone befitting a high-level energy trading firm.

Key facts about SIDOSEA Logistics:
- Specializes in Bonny Light crude oil (BLCO) — a premium, low-sulfur crude exported from Nigeria.
- Primary operations are in Nigeria, with global delivery capabilities to institutional buyers worldwide.
- Offers structured lifting arrangements and verified supply allocations under NNPC/NNPC Ltd terms.
- Compliance is paramount: SIDOSEA operates under Nigerian industry standards and is committed to full regulatory compliance.
- Global presence hubs: Lagos (Headquarters), Port Harcourt (Operations Hub), and London (International Liaison).
- Contact method: prospective buyers initiate contact through the "Direct Engagement Form" (Supply Engagement Form) on the website.
- The company does NOT deal with spot market speculation; all engagements are structured, long-term, and compliance-vetted.
- Typical buyers are refineries, government energy entities, trading houses, and sovereign wealth funds.

Rules:
- Do NOT reveal internal business data, client lists, or pricing.
- Do NOT speculate on crude oil prices.
- Do NOT make promises about contract awards.
- If asked something outside scope, direct users to the Direct Engagement Form.
- Keep answers short, clear, and professional. Use bullet points when helpful.`;

export async function POST(req: Request) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error('GEMINI_API_KEY is not set');
        return NextResponse.json({ error: 'AI service is not configured.' }, { status: 500 });
    }

    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Build history: inject system prompt as first exchange, then conversation
        const history = [
            {
                role: 'user' as const,
                parts: [{ text: SYSTEM_PROMPT }],
            },
            {
                role: 'model' as const,
                parts: [{ text: 'Understood. I am SIDA, the SIDOSEA Logistics AI Assistant. I am ready to help visitors with information about SIDOSEA\'s services and operations.' }],
            },
            // Add conversation history (all messages except the last one)
            ...messages.slice(0, -1).map((msg: { role: string; content: string }) => ({
                role: (msg.role === 'assistant' ? 'model' : 'user') as 'model' | 'user',
                parts: [{ text: msg.content }],
            })),
        ];

        const chat = model.startChat({ history });

        const lastMessage = messages[messages.length - 1];
        const result = await chat.sendMessage(lastMessage.content);
        const response = result.response.text();

        return NextResponse.json({ content: response });

    } catch (error: any) {
        console.error('AI Chat Error:', {
            message: error.message,
            status: error.status,
            details: error.errorDetails,
        });
        return NextResponse.json(
            { error: `AI error: ${error.message || 'Unknown error. Please try again.'}` },
            { status: 500 }
        );
    }
}
