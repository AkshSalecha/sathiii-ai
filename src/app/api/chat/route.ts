import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

const SAATHI_SYSTEM = `You are Saathi — India's trusted private native-language Life OS. You are a warm, knowledgeable AI companion for Indian families, elders, and small businesses.

PERSONA: You speak like a caring, wise family elder who is also tech-savvy. Warm, never corporate. Use Gujarati/Hindi/Hinglish code-switching naturally — the way Indian families actually talk.

LANGUAGE RULES:
- Mix Gujarati, Hindi, and English naturally in every response
- Use "Bhai", "Ben", "Ji" appropriately
- Greet warmly with "Kem cho", "Namaste" etc.
- End important advice with 🙏
- Be warm but precise

WHAT YOU HELP WITH:
1. ELDER CARE — medicines, appointments, emergency contacts, devotional routines, health tips
2. KITCHEN — Gujarati/Indian recipes step-by-step, ingredient substitutions, dietary guidance
3. BUSINESS OS — sales entry, expense tracking, customer dues, follow-up reminders, GST summaries
4. TRUST SHIELD — fraud detection, UPI scam warnings, suspicious call analysis, cyber safety
5. DAILY LIFE — morning briefings, schedules, reminders, family updates

FORMAT RULES:
- No markdown asterisks or hashtags
- Use emoji bullets: 💊 📊 🍽️ 🛡️ 📞 ✅ 🔴
- Keep responses warm and under 200 words unless recipe/technical
- Always end with an offer to help more

REMEMBER ABOUT USER:
- Name: Rameshbhai, City: Ahmedabad
- Father: Amrutbhai (elder, needs medicine help)
- Emergency: Kalpanaben (daughter) 98XXX-12345
- Doctor: Dr. Patel (cardiologist) 98765-43210
- Business: Ramesh General Store, Maninagar
- Medicines: Metformin 500mg (8AM overdue), Amlodipine (done), Vitamin D3 (9PM)
- Dues: Suresh Traders ₹3500 (7 days), Harshbhai ₹5000 (12 days), Priyaben ₹3000

PRIVACY: "Tamaro data sirf tamaro device par save thay che. Saathi kabhi data share nahi karta. 🔐"`

export async function POST(req: NextRequest) {
  console.log('[Saathi] Chat request received')

  // 1. Validate API key
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.error('[Saathi] GEMINI_API_KEY is not set')
    return NextResponse.json(
      { reply: 'Saathi abhi setup ho raha hai. Thodi der baad try karein. 🙏' },
      { status: 200 }
    )
  }

  // 2. Parse request body
  let messages: Array<{ role: string; content: string }> = []
  let mode = 'general'

  try {
    const body = await req.json()
    messages = body.messages || []
    mode = body.mode || 'general'
    console.log('[Saathi] Mode:', mode, '| Messages count:', messages.length)
  } catch (err) {
    console.error('[Saathi] Failed to parse request body:', err)
    return NextResponse.json(
      { reply: 'Request format galat hai. Phir try karein! 🙏' },
      { status: 200 }
    )
  }

  // 3. Get the latest user message
  const lastUserMsg = [...messages].reverse().find(m => m.role === 'user')
  if (!lastUserMsg || !lastUserMsg.content?.trim()) {
    console.warn('[Saathi] No user message found')
    return NextResponse.json(
      { reply: 'Kem cho! Koi sawaal puchho — hu madad karne taiyar chu 🙏' },
      { status: 200 }
    )
  }

  // 4. Build mode-specific context
  const modeContext: Record<string, string> = {
    elder:    'FOCUS ON: Elder care — be extra gentle. Help with medicines, appointments, emergency contacts.',
    kitchen:  'FOCUS ON: Kitchen help — give step-by-step Gujarati recipes with measurements.',
    business: 'FOCUS ON: Business OS — show numbers clearly, draft WhatsApp messages, track dues.',
    shield:   'FOCUS ON: Trust Shield — be firm about fraud warnings, calm about cyber safety.',
    general:  'FOCUS ON: General life OS — reminders, daily planning, family care.',
  }

  // 5. Build the full prompt for Gemini
  // Gemini does not have a system role in the same way, so we prepend it as context
  const fullPrompt = `${SAATHI_SYSTEM}

CURRENT MODE: ${modeContext[mode] || modeContext.general}

USER MESSAGE: ${lastUserMsg.content}

Respond as Saathi in a warm, helpful way. Use Gujarati/Hindi/English mix naturally.`

  console.log('[Saathi] Sending to Gemini, prompt length:', fullPrompt.length)

  // 6. Call Gemini API
  try {
    const geminiResponse = await fetch(
      `${GEMINI_API_URL}?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: fullPrompt }],
            },
          ],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 600,
            topP: 0.9,
          },
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT',        threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH',       threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
          ],
        }),
      }
    )

    console.log('[Saathi] Gemini status:', geminiResponse.status)

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text()
      console.error('[Saathi] Gemini API error:', geminiResponse.status, errorText)
      return NextResponse.json(
        { reply: 'Saathi thodi der ke liye busy hai. Ek minute baad try karein! 🙏' },
        { status: 200 }
      )
    }

    // 7. Parse Gemini response
    const geminiData = await geminiResponse.json()
    console.log('[Saathi] Gemini response received')

    const reply =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()

    if (!reply) {
      console.warn('[Saathi] Empty reply from Gemini. Full response:', JSON.stringify(geminiData))
      return NextResponse.json(
        { reply: 'Kem cho Rameshbhai! 🙏 Hu tamari madad karne taiyar chu. Koi bhi sawaal puchho — medicine, recipe, business, ya koi bhi kaam!' },
        { status: 200 }
      )
    }

    console.log('[Saathi] Sending reply, length:', reply.length)
    return NextResponse.json({ reply }, { status: 200 })

  } catch (err) {
    console.error('[Saathi] Network/fetch error calling Gemini:', err)
    return NextResponse.json(
      { reply: 'Network issue aayo. Internet check karo aur phir try karein! 🙏' },
      { status: 200 }
    )
  }
}
