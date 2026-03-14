import { NextResponse } from 'next/server';

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
    const rawApiKey = process.env.GEMINI_API_KEY;

    if (!rawApiKey) {
        return NextResponse.json({ error: 'AI service is not configured.' }, { status: 500 });
    }

    const apiKey = rawApiKey.trim();

    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
        }

        // Using gemini-2.0-flash which is verified to work with v1 and this API key
        const apiURL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        // Prepare the history-based payload
        const contents = [
            {
                role: 'user',
                parts: [{ text: `System Context: ${SYSTEM_PROMPT}\n\nPlease acknowledge your role as SIDA.` }]
            },
            {
                role: 'model',
                parts: [{ text: "Understood. I am SIDA, the official SIDOSEA Logistics AI Assistant. I am ready to assist with information about our crude oil trading, logistics, and compliance operations." }]
            },
            ...messages.map((msg: { role: string; content: string }) => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            }))
        ];

        const response = await fetch(apiURL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ contents }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Gemini API Error:', JSON.stringify(data, null, 2));
            
            // Distinguish between different error types for the frontend
            if (response.status === 429) {
                return NextResponse.json(
                    { error: 'AI Quota Limit Reached. Please try again tomorrow or provide a new API key.' },
                    { status: 429 }
                );
            }
            
            if (response.status === 403 || response.status === 401) {
                return NextResponse.json(
                    { error: 'AI Configuration Error: Invalid API Key.' },
                    { status: response.status }
                );
            }

            return NextResponse.json(
                { error: `AI Error: ${data.error?.message || 'The AI service is currently unavailable.'}` },
                { status: response.status }
            );
        }

        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I am sorry, I couldn't generate a response at this time.";
        return NextResponse.json({ content: aiText });

    } catch (error: any) {
        console.error('AI Route Error:', error);
        return NextResponse.json(
            { error: 'System error. Please try again later.' },
            { status: 500 }
        );
    }
}
