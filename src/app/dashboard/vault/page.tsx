'use client'
import { useState } from 'react'

const ITEMS = [
  { cat: 'health',   icon: '💊', label: 'Amrutbhai medicines',    sub: '3 active prescriptions' },
  { cat: 'health',   icon: '🏥', label: 'Dr. Patel contact',      sub: 'Cardiologist · 98765-43210' },
  { cat: 'health',   icon: '🩺', label: 'Blood test results',     sub: 'March 2025 · HbA1c 7.2' },
  { cat: 'family',   icon: '👨‍👩‍👧', label: 'Kalpanaben (Daughter)', sub: 'Emergency · 98XXX-12345' },
  { cat: 'family',   icon: '🎂', label: 'Family birthdays',       sub: '6 dates · Next: Dadi Apr 22' },
  { cat: 'family',   icon: '📍', label: 'Home address',           sub: 'Maninagar, Ahmedabad' },
  { cat: 'business', icon: '🏪', label: 'Ramesh General Store',   sub: 'GSTIN · Bank account' },
  { cat: 'business', icon: '👥', label: 'Customer ledger',        sub: '23 customers · ₹11,500 dues' },
  { cat: 'docs',     icon: '📄', label: 'Legal documents',        sub: 'Shop license · Aadhar' },
]

export default function VaultPage() {
  const [pin, setPin] = useState('')
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const pressPin = (k: string) => {
    if (k === 'CLR') { setPin(''); return }
    if (k === '⌫') { setPin(p => p.slice(0, -1)); return }
    if (pin.length >= 4) return
    const np = pin + k
    setPin(np)
    if (np.length === 4) {
      setTimeout(() => { setOpen(true); setPin(''); showToast('🔓 Vault unlocked · Auto-locks in 5 min') }, 300)
    }
  }

  const filtered = filter === 'all' ? ITEMS : ITEMS.filter(i => i.cat === filter)

  if (!open) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', gap: '20px', fontFamily: 'Sora, sans-serif' }}>
      {toast && <div style={{ position: 'fixed', top: '20px', right: '20px', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '12px 18px', fontSize: '13px', color: '#F0EFE8', zIndex: 999 }}>{toast}</div>}
      <div style={{ fontSize: '56px' }}>🔐</div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '22px', fontWeight: '700', marginBottom: '6px' }}>Secure Vault</div>
        <div style={{ fontSize: '13px', color: '#A8A6A0', maxWidth: '280px' }}>Your most sensitive data is encrypted. Enter your 4-digit PIN to access.</div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {[0,1,2,3].map(i => <div key={i} style={{ width: '14px', height: '14px', borderRadius: '50%', border: `2px solid ${i < pin.length ? '#FF6B1A' : 'rgba(255,255,255,0.2)'}`, background: i < pin.length ? '#FF6B1A' : 'transparent', transition: 'all 0.2s' }} />)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 56px)', gap: '8px' }}>
        {['1','2','3','4','5','6','7','8','9','CLR','0','⌫'].map(k => (
          <button key={k} onClick={() => pressPin(k)} style={{ width: '56px', height: '48px', borderRadius: '10px', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.08)', color: '#F0EFE8', fontSize: k.length > 1 ? '12px' : '16px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Sora, sans-serif', transition: 'all 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#252535')}
            onMouseLeave={e => (e.currentTarget.style.background = '#1E1E2A')}>{k}</button>
        ))}
      </div>
      <div style={{ fontSize: '11px', color: '#6A6870' }}>Enter any 4 digits to see demo</div>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {toast && <div style={{ position: 'fixed', top: '20px', right: '20px', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '12px 18px', fontSize: '13px', color: '#F0EFE8', zIndex: 999 }}>{toast}</div>}

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ fontSize: '28px' }}>🔓</div>
        <div>
          <div style={{ fontSize: '19px', fontWeight: '700' }}>Vault Unlocked</div>
          <div style={{ fontSize: '12px', color: '#A8A6A0' }}>All data encrypted · Auto-locks in 5 min</div>
        </div>
        <button onClick={() => { setOpen(false); showToast('🔐 Vault locked — your data is secure') }} style={{ marginLeft: 'auto', padding: '7px 14px', borderRadius: '9px', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.08)', color: '#A8A6A0', fontSize: '12px', cursor: 'pointer', fontFamily: 'Sora, sans-serif' }}>🔐 Lock vault</button>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {['all','health','family','business','docs'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Sora, sans-serif', background: filter === f ? 'rgba(255,107,26,0.12)' : '#1E1E2A', color: filter === f ? '#FF6B1A' : '#A8A6A0', border: `1px solid ${filter === f ? 'rgba(255,107,26,0.25)' : 'rgba(255,255,255,0.07)'}`, textTransform: 'capitalize' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Items */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
        {filtered.map((item, i) => (
          <div key={i} onClick={() => showToast(`🔐 Viewing: ${item.label}`)} style={{ background: '#16161E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '18px', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,107,26,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '9px', background: '#1E1E2A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{item.icon}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</div>
                <div style={{ fontSize: '11px', color: '#6A6870', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.sub}</div>
              </div>
            </div>
            <span style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '10px', background: 'rgba(82,196,122,0.07)', border: '1px solid rgba(82,196,122,0.12)', color: '#52C47A', fontWeight: '600' }}>🔐 Encrypted</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ background: '#16161E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '18px' }}>
        <div style={{ fontSize: '10px', color: '#6A6870', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '12px' }}>MEMORY CONTROLS — YOUR DATA, YOUR RULES</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {[
            { label: '📋 Export all memory', safe: true },
            { label: '🗑️ Clear session memory', safe: true },
            { label: '⚙️ Edit permissions', safe: true },
            { label: '⚠️ Delete all data', safe: false },
          ].map(b => (
            <button key={b.label} onClick={() => showToast(b.safe ? `✅ ${b.label.replace(/[^\w\s]/g,'').trim()} done!` : '⚠️ All Saathi data permanently deleted')} style={{ padding: '8px 14px', borderRadius: '9px', background: '#1E1E2A', border: `1px solid ${b.safe ? 'rgba(255,255,255,0.08)' : 'rgba(224,82,82,0.25)'}`, color: b.safe ? '#A8A6A0' : '#E05252', fontSize: '12px', cursor: 'pointer', fontFamily: 'Sora, sans-serif' }}>
              {b.label}
            </button>
          ))}
        </div>
        <div style={{ fontSize: '12px', color: '#6A6870', marginTop: '12px' }}>Saathi stores only what you explicitly approve. No data is shared or sold. Ever. 🔐</div>
      </div>
    </div>
  )
}
