import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const userMessage =
      messages?.[messages.length - 1]?.content || "Hello"

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userMessage }],
            },
          ],
        }),
      }
    )

    const data = await response.json()

    console.log("FULL GEMINI RESPONSE:", JSON.stringify(data, null, 2))

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!reply) {
      return NextResponse.json({
        reply: "⚠️ Gemini did not return text. Check logs.",
      })
    }

    return NextResponse.json({ reply })

  } catch (err) {
    console.error("ERROR:", err)
    return NextResponse.json({
      reply: "Server error — check logs",
    })
  }
}
