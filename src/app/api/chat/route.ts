import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const userMessage = messages[messages.length - 1]?.content

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: userMessage,
                },
              ],
            },
          ],
        }),
      }
    )

    const data = await response.json()

    console.log("GEMINI RESPONSE:", data)

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI"

    return NextResponse.json({ reply })

  } catch (err) {
    console.error("ERROR:", err)
    return NextResponse.json({ reply: "Server error" })
  }
}
