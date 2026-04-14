'use client'
import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

type Msg = { role: 'user' | 'assistant'; content: string }

const MODES = [
  { id: 'general',  label: 'General',      emoji: '💬' },
  { id: 'elder',    label: 'Elder Care',    emoji: '🧓' },
  { id: 'kitchen',  label: 'Kitchen',       emoji: '🍳' },
  { id: 'business', label: 'Business',      emoji: '📊' },
  { id: 'shield',   label: 'Trust Shield',  emoji: '🛡️' },
]

const CHIPS: Record<string, string[]> = {
  general:  ['Kem cho! Aaj kya madad karu?', 'Today ka plan batao', 'Family update do'],
  elder:    ['Amrutbhai ki medicine check karo', 'Dr. Patel ka number do', 'Emergency contacts batao'],
  kitchen:  ['Dal dhokli recipe batao', 'Khichdi banane ki vidhi', 'Aaj dinner mein kya banau?'],
  business: ['Aaj ka sales summary', 'Suresh ne payment reminder bhejo', 'Is week ka profit kitna tha?'],
  shield:   ['Aaj ke alerts review karo', 'UPI fraud se kaise bachein?', 'Suspicious call aaya — kya karein?'],
}

function ChatContent() {
  const params = useSearchParams()
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'assistant', content: 'Kem cho Rameshbhai! 🙏\n\nHoon tamaro Saathi — tamaro personal Life OS. Aaj kem madad kari shakun?\n\n💊 Medicine · 🍽️ Recipe · 📊 Business · 🛡️ Shield — koi bhi puchho!' }
  ])
  const [input, setInput] = useState('')
  const [mode, setMode] = useState('general')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const sentRef = useRef(false)

  // auto-send query from URL
  useEffect(() => {
    const q = params.get('q')
    if (q && !sentRef.current) {
      sentRef.current = true
      setTimeout(() => send(q), 400)
    }
  }, [params])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs, loading])

  async function send(text?: string) {
    const content = (text ?? input).trim()
    if (!content || loading) return
    setInput('')
    const userMsg: Msg = { role: 'user', content }
    const history = [...msgs, userMsg]
    setMsgs(history)
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history.map(m => ({ role: m.role, content: m.content })), mode }),
      })
      const data = await res.json()
      setMsgs([...history, { role: 'assistant', content: data.reply }])
    } catch {
      setMsgs([...history, { role: 'assistant', content: 'Maafi karo, network issue aaya. Phir try karein! 🙏' }])
    }
    setLoading(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const avColors: Record<string, string> = { general: '#FF6B1A', elder: '#8B5E3C', kitchen: '#0B7B5C', business: '#185FA5', shield: '#7B0B3C' }

  return (
    <div style={{ display: 'flex', gap: '16px', height: 'calc(100vh - 130px)' }}>

      {/* Main chat */}
      <div style={{ flex: 1, background: '#16161E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Chat header */}
        <div style={{ padding: '14px 18px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, ${avColors[mode]}, ${avColors[mode]}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', border: '2px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
            {MODES.find(m => m.id === mode)?.emoji}
          </div>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '600' }}>Saathi — {MODES.find(m => m.id === mode)?.label}</div>
            <div style={{ fontSize: '11px', color: '#52C47A', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#52C47A', display: 'inline-block' }} /> Online · Speaking Gujarati
            </div>
          </div>
          {/* Mode chips */}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {MODES.map(m => (
              <button key={m.id} onClick={() => setMode(m.id)} style={{ padding: '5px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', cursor: 'pointer', border: `1px solid ${mode === m.id ? 'rgba(255,107,26,0.3)' : 'rgba(255,255,255,0.08)'}`, background: mode === m.id ? 'rgba(255,107,26,0.12)' : '#1E1E2A', color: mode === m.id ? '#FF6B1A' : '#A8A6A0', fontFamily: 'Sora, sans-serif', transition: 'all 0.15s' }}>
                {m.emoji} {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', flexDirection: m.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end' }}>
              {m.role === 'assistant' && (
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: `linear-gradient(135deg, ${avColors[mode]}, ${avColors[mode]}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0 }}>
                  {MODES.find(mx => mx.id === mode)?.emoji}
                </div>
              )}
              <div style={{ maxWidth: '72%' }}>
                <div style={{ padding: '11px 15px', borderRadius: m.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px', fontSize: '13px', lineHeight: '1.65', whiteSpace: 'pre-wrap', background: m.role === 'user' ? 'linear-gradient(135deg, #FF6B1A, #C94E00)' : '#1E1E2A', color: m.role === 'user' ? 'white' : '#F0EFE8', border: m.role === 'assistant' ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                  {m.content}
                </div>
                <div style={{ fontSize: '10px', color: '#6A6870', marginTop: '3px', textAlign: m.role === 'user' ? 'right' : 'left' }}>
                  {m.role === 'assistant' ? 'Saathi' : 'You'} · now
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: `linear-gradient(135deg, ${avColors[mode]}, ${avColors[mode]}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>
                {MODES.find(m => m.id === mode)?.emoji}
              </div>
              <div style={{ padding: '12px 16px', borderRadius: '4px 16px 16px 16px', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6A6870', animation: `bounce 1.2s ${i*0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick chips */}
        <div style={{ padding: '10px 18px 0', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {CHIPS[mode]?.map(chip => (
            <button key={chip} onClick={() => send(chip)} style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '16px', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.08)', color: '#A8A6A0', cursor: 'pointer', fontFamily: 'Sora, sans-serif', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,107,26,0.3)'; e.currentTarget.style.color = '#F0EFE8' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#A8A6A0' }}>
              {chip}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '12px 18px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.08)', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} title="Voice input (coming soon)">🎤</button>
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
            placeholder="Gujarati, Hindi, ya English mein puchho..."
            style={{ flex: 1, background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 15px', fontSize: '13px', color: '#F0EFE8', fontFamily: 'Sora, sans-serif', outline: 'none' }}
            onFocus={e => (e.target.style.borderColor = 'rgba(255,107,26,0.4)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')} />
          <button onClick={() => send()} disabled={loading || !input.trim()}
            style={{ width: '40px', height: '40px', borderRadius: '10px', background: loading || !input.trim() ? '#1E1E2A' : '#FF6B1A', border: 'none', fontSize: '18px', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s' }}>
            ↑
          </button>
        </div>
      </div>

      {/* Sidebar info */}
      <div style={{ width: '220px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ background: '#16161E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '16px' }}>
          <div style={{ fontSize: '10px', color: '#6A6870', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '8px' }}>ACTIVE MODE</div>
          <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{MODES.find(m => m.id === mode)?.emoji} {MODES.find(m => m.id === mode)?.label}</div>
          <div style={{ fontSize: '11px', color: '#6A6870' }}>Switch mode with the chips above</div>
        </div>
        <div style={{ background: '#16161E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '16px' }}>
          <div style={{ fontSize: '10px', color: '#6A6870', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '10px' }}>SAATHI REMEMBERS</div>
          <div style={{ fontSize: '12px', color: '#A8A6A0', lineHeight: '1.9' }}>
            👨‍👩‍👦 Rameshbhai + Amrutbhai<br/>
            📍 Maninagar, Ahmedabad<br/>
            💊 Metformin 500mg (8AM)<br/>
            🏥 Dr. Patel · 98765-43210<br/>
            🏪 Ramesh General Store
          </div>
          <div style={{ marginTop: '8px', fontSize: '10px', padding: '3px 8px', borderRadius: '10px', background: 'rgba(82,196,122,0.08)', border: '1px solid rgba(82,196,122,0.15)', color: '#52C47A', display: 'inline-block', fontWeight: '600' }}>🔐 Encrypted</div>
        </div>
        <div style={{ background: '#16161E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '16px' }}>
          <div style={{ fontSize: '10px', color: '#6A6870', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '8px' }}>TIPS</div>
          <div style={{ fontSize: '11px', color: '#6A6870', lineHeight: '1.7' }}>
            · Ask in Gujarati, Hindi or English<br/>
            · Switch modes for focused help<br/>
            · Say "recipe" for step-by-step cooking<br/>
            · Say "add sale ₹500" to log business
          </div>
        </div>
      </div>

      <style>{`@keyframes bounce { 0%,60%,100%{transform:translateY(0);opacity:0.4} 30%{transform:translateY(-6px);opacity:1} }`}</style>
    </div>
  )
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div style={{ color: '#A8A6A0', padding: '40px', textAlign: 'center' }}>Loading Saathi... 🙏</div>}>
      <ChatContent />
    </Suspense>
  )
}
