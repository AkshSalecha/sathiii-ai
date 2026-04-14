'use client'
import { useState } from 'react'
import Link from 'next/link'

type Med = { id: string; name: string; purpose: string; time: string; status: string }

export default function ElderPage() {
  const [meds, setMeds] = useState<Med[]>([
    { id: '1', name: 'Metformin 500mg', purpose: 'Diabetes · With breakfast', time: '8:00 AM', status: 'overdue' },
    { id: '2', name: 'Amlodipine 5mg',  purpose: 'Blood Pressure · Morning',  time: '8:00 AM', status: 'done' },
    { id: '3', name: 'Vitamin D3',       purpose: 'Calcium support · Night',   time: '9:00 PM', status: 'pending' },
  ])
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const markDone = (id: string) => {
    setMeds(prev => prev.map(m => m.id === id ? { ...m, status: 'done' } : m))
    showToast('💊 Medicine marked done! Saathi will remind for next dose 🙏')
  }

  const statusColor: Record<string, string> = { overdue: '#E05252', done: '#52C47A', pending: '#6A6870' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

      {toast && <div style={{ position: 'fixed', top: '20px', right: '20px', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '12px 18px', fontSize: '13px', color: '#F0EFE8', zIndex: 999, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>{toast}</div>}

      {/* Elder hero */}
      <div style={{ background: 'linear-gradient(135deg, rgba(139,94,60,0.18), rgba(107,66,38,0.08))', border: '1px solid rgba(232,184,75,0.18)', borderRadius: '18px', padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ width: '66px', height: '66px', borderRadius: '50%', background: 'linear-gradient(135deg, #8B5E3C, #6B4226)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', border: '3px solid rgba(232,184,75,0.25)', flexShrink: 0 }}>🧓</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '3px' }}>Amrutbhai Patel</div>
          <div style={{ fontSize: '12px', color: '#52C47A', marginBottom: '4px' }}>✓ Checked in — 7:30 AM today</div>
          <div style={{ fontSize: '12px', color: '#6A6870' }}>Last medicine: BP tablet 8PM last night · Metformin OVERDUE</div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
            <button onClick={() => showToast('📞 Calling Amrutbhai via Saathi voice...')} style={{ padding: '7px 14px', borderRadius: '9px', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.1)', color: '#A8A6A0', fontSize: '12px', cursor: 'pointer', fontFamily: 'Sora, sans-serif' }}>📞 Call now</button>
            <button onClick={() => showToast('💬 Family WhatsApp update sent!')} style={{ padding: '7px 14px', borderRadius: '9px', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.1)', color: '#A8A6A0', fontSize: '12px', cursor: 'pointer', fontFamily: 'Sora, sans-serif' }}>💬 Family update</button>
            <button onClick={() => showToast('🚨 EMERGENCY — Dr. Patel & Kalpanaben notified immediately!')} style={{ padding: '7px 14px', borderRadius: '9px', background: 'rgba(224,82,82,0.15)', border: '1px solid rgba(224,82,82,0.3)', color: '#E05252', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: 'Sora, sans-serif' }}>🚨 Emergency</button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>

        {/* Medicines */}
        <div style={{ background: '#16161E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '18px' }}>
          <div style={{ fontSize: '10px', color: '#6A6870', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '14px' }}>MEDICINES TODAY</div>
          {meds.map((med, i) => (
            <div key={med.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 0', borderBottom: i < meds.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ fontSize: '22px' }}>💊</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{med.name}</div>
                <div style={{ fontSize: '11px', color: '#6A6870' }}>{med.purpose}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#E8B84B' }}>{med.time}</div>
                <div style={{ fontSize: '10px', color: statusColor[med.status], fontWeight: '600' }}>
                  {med.status === 'done' ? '✓ Done' : med.status === 'overdue' ? 'OVERDUE' : 'Tonight'}
                </div>
              </div>
              {med.status !== 'done' && (
                <button onClick={() => markDone(med.id)} style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.1)', color: '#A8A6A0', cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(82,196,122,0.15)'; e.currentTarget.style.borderColor = 'rgba(82,196,122,0.3)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1E1E2A'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}>✓</button>
              )}
            </div>
          ))}
        </div>

        {/* Appointments */}
        <div style={{ background: '#16161E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '18px' }}>
          <div style={{ fontSize: '10px', color: '#6A6870', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '14px' }}>APPOINTMENTS</div>
          {[
            { doctor: 'Dr. Patel — Cardiology', date: 'Today · 4:30 PM · Sterling', status: 'today' },
            { doctor: 'Eye Checkup',            date: '15 April · 10:00 AM',          status: 'upcoming' },
            { doctor: 'Blood Test — Lab',       date: '22 April',                      status: 'future' },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '500' }}>{a.doctor}</div>
                <div style={{ fontSize: '11px', color: '#6A6870', marginTop: '2px' }}>{a.date}</div>
              </div>
              <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '10px', fontWeight: '700', background: a.status === 'today' ? 'rgba(82,196,122,0.1)' : 'rgba(232,184,75,0.1)', color: a.status === 'today' ? '#52C47A' : '#E8B84B' }}>{a.status}</span>
            </div>
          ))}
          <button onClick={() => showToast('📅 Add appointment — use Saathi Chat!')} style={{ width: '100%', marginTop: '12px', padding: '8px', borderRadius: '9px', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.08)', color: '#A8A6A0', fontSize: '12px', cursor: 'pointer', fontFamily: 'Sora, sans-serif' }}>+ Add appointment</button>
        </div>

        {/* Emergency chain */}
        <div style={{ background: '#16161E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '18px' }}>
          <div style={{ fontSize: '10px', color: '#6A6870', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '14px' }}>EMERGENCY CHAIN</div>
          {[
            { label: '⚡ FIRST', name: 'Kalpanaben (Daughter)', phone: '98XXX-12345', danger: true },
            { label: 'SECOND',  name: 'Dr. Patel',             phone: '98765-43210', danger: false },
            { label: 'AUTO',    name: 'Ambulance — 108',       phone: 'Auto-dialed',  danger: false },
          ].map((c, i) => (
            <div key={i} style={{ background: c.danger ? 'rgba(224,82,82,0.07)' : '#1E1E2A', border: `1px solid ${c.danger ? 'rgba(224,82,82,0.18)' : 'rgba(255,255,255,0.06)'}`, borderRadius: '10px', padding: '11px', marginBottom: i < 2 ? '8px' : 0 }}>
              <div style={{ fontSize: '10px', color: c.danger ? '#E05252' : '#6A6870', fontWeight: '700', marginBottom: '4px' }}>{c.label}</div>
              <div style={{ fontSize: '13px', fontWeight: '600' }}>{c.name}</div>
              <div style={{ fontSize: '11px', color: '#6A6870' }}>{c.phone}</div>
              {c.danger && <button onClick={() => showToast('📞 Emergency call initiated!')} style={{ marginTop: '8px', padding: '5px 12px', borderRadius: '7px', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.08)', color: '#A8A6A0', fontSize: '11px', cursor: 'pointer', fontFamily: 'Sora, sans-serif' }}>📞 Call now</button>}
            </div>
          ))}
        </div>
      </div>

      {/* Routines */}
      <div style={{ background: '#16161E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '18px' }}>
        <div style={{ fontSize: '10px', color: '#6A6870', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '12px' }}>DEVOTIONAL & DAILY ROUTINE</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' }}>
          {[
            { emoji: '🕉️', label: 'Morning prayer', msg: '🙏 Playing Ganesh Aarti in Gujarati...' },
            { emoji: '📿', label: 'Ram dhun',        msg: '📿 Playing Ram Dhun — 11 minutes' },
            { emoji: '🌅', label: 'Family update',   msg: '💬 Morning WhatsApp update sent to family!' },
            { emoji: '💚', label: 'Health tip',      msg: '💚 Sending Gujarati health tip to Amrutbhai...' },
          ].map(r => (
            <button key={r.label} onClick={() => showToast(r.msg)} style={{ background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px 10px', textAlign: 'center', cursor: 'pointer', fontFamily: 'Sora, sans-serif', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,107,26,0.3)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}>
              <div style={{ fontSize: '24px', marginBottom: '6px' }}>{r.emoji}</div>
              <div style={{ fontSize: '11px', color: '#A8A6A0', fontWeight: '500' }}>{r.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/dashboard/chat?q=Amrutbhai+ki+health+ke+baare+mein+aaj+ka+update+do" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FF6B1A', color: 'white', padding: '10px 22px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}>
          💬 Ask Saathi about Amrutbhai →
        </Link>
      </div>
    </div>
  )
}
