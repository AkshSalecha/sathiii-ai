'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const PERSONAS = [
  { id: 'elder', emoji: '🧓', name: 'Dadi / Nana', desc: 'Warm elder guide — for family & care' },
  { id: 'professional', emoji: '👔', name: 'Professional', desc: 'Smart business concierge' },
  { id: 'friend', emoji: '😊', name: 'Dost / Friend', desc: 'Casual, fun daily helper' },
  { id: 'health', emoji: '👨‍⚕️', name: 'Health Guide', desc: 'Medical & wellness focused' },
]

const LANGUAGES = [
  { code: 'gujarati', label: 'ગુજરાતી' },
  { code: 'hindi', label: 'हिंदी' },
  { code: 'hinglish', label: 'Hinglish' },
  { code: 'english', label: 'English' },
  { code: 'tamil', label: 'தமிழ்' },
  { code: 'bengali', label: 'বাংলা' },
  { code: 'marathi', label: 'मराठी' },
  { code: 'telugu', label: 'తెలుగు' },
]

export default function Onboarding() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [persona, setPersona] = useState('elder')
  const [lang, setLang] = useState('gujarati')

  const start = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('saathi_persona', persona)
      localStorage.setItem('saathi_lang', lang)
    }
    router.push('/dashboard/family')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0F0F14', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', fontFamily: 'Sora, sans-serif' }}>

      {/* Glow */}
      <div style={{ position: 'fixed', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: 'radial-gradient(ellipse, rgba(255,107,26,0.08), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '580px', width: '100%', position: 'relative' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🙏</div>
          <div style={{ fontSize: '28px', fontWeight: '800', background: 'linear-gradient(90deg, #fff, #FFB480)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '6px' }}>
            Saathi AI
          </div>
          <div style={{ fontSize: '13px', color: '#6A6870' }}>India's private native-language Life OS</div>
        </div>

        {step === 1 && (
          <div>
            <div style={{ fontSize: '11px', color: '#6A6870', fontWeight: '700', letterSpacing: '1px', textAlign: 'center', marginBottom: '20px' }}>STEP 1 OF 2 — CHOOSE YOUR GUIDE</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              {PERSONAS.map(p => (
                <div key={p.id} onClick={() => setPersona(p.id)} style={{ background: persona === p.id ? 'rgba(255,107,26,0.07)' : '#16161E', border: `2px solid ${persona === p.id ? '#FF6B1A' : 'rgba(255,255,255,0.07)'}`, borderRadius: '16px', padding: '24px 16px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>{p.emoji}</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '4px', color: '#F0EFE8' }}>{p.name}</div>
                  <div style={{ fontSize: '11px', color: '#6A6870' }}>{p.desc}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(2)} style={{ width: '100%', background: '#FF6B1A', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: 'Sora, sans-serif', boxShadow: '0 8px 24px rgba(255,107,26,0.3)' }}>
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ fontSize: '11px', color: '#6A6870', fontWeight: '700', letterSpacing: '1px', textAlign: 'center', marginBottom: '20px' }}>STEP 2 OF 2 — YOUR LANGUAGE</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '24px' }}>
              {LANGUAGES.map(l => (
                <div key={l.code} onClick={() => setLang(l.code)} style={{ background: lang === l.code ? 'rgba(255,107,26,0.1)' : '#16161E', border: `2px solid ${lang === l.code ? '#FF6B1A' : 'rgba(255,255,255,0.07)'}`, borderRadius: '12px', padding: '16px 8px', textAlign: 'center', cursor: 'pointer', fontSize: '13px', fontWeight: '600', color: '#F0EFE8', transition: 'all 0.2s' }}>
                  {l.label}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, background: '#1E1E2A', color: '#A8A6A0', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '13px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Sora, sans-serif' }}>← Back</button>
              <button onClick={start} style={{ flex: 2, background: '#FF6B1A', color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: 'Sora, sans-serif', boxShadow: '0 8px 24px rgba(255,107,26,0.3)' }}>
                Saathi shuru karo 🙏
              </button>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '11px', color: '#3A3840' }}>
          🔐 Your data stays encrypted on your device. Never shared or sold.
        </div>
      </div>
    </div>
  )
}
