'use client'
import Link from 'next/link'

const reminders = [
  { title: 'Amrutbhai — Metformin 500mg', time: '8:00 AM', status: 'overdue' },
  { title: 'Sureshbhai payment follow-up', time: '12:00 PM', status: 'upcoming' },
  { title: 'Dr. Patel appointment', time: '4:30 PM', status: 'today' },
  { title: 'Dadi evening medicine', time: '9:00 PM', status: 'tonight' },
]

const statusDot: Record<string, string> = {
  overdue: '#E05252', upcoming: '#E8B84B', today: '#52C47A', tonight: '#E8B84B',
}
const statusLabel: Record<string, { bg: string; color: string }> = {
  overdue:  { bg: 'rgba(224,82,82,0.1)',    color: '#E05252' },
  upcoming: { bg: 'rgba(232,184,75,0.1)',   color: '#E8B84B' },
  today:    { bg: 'rgba(82,196,122,0.1)',   color: '#52C47A' },
  tonight:  { bg: 'rgba(232,184,75,0.1)',   color: '#E8B84B' },
}

const quickActions = [
  { emoji: '🍽️', label: 'Recipe guide',    href: '/dashboard/chat?q=Dal+dhokli+recipe+Gujarati+mein+batao' },
  { emoji: '📊', label: 'Sales summary',   href: '/dashboard/chat?q=Aaj+nu+sales+summary+batao' },
  { emoji: '💊', label: 'Medicine check',  href: '/dashboard/elder' },
  { emoji: '📞', label: 'Customer call',   href: '/dashboard/chat?q=Suresh+Traders+ne+payment+reminder+moko' },
]

export default function FamilyPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

      {/* Greeting banner */}
      <div style={{ background: 'linear-gradient(135deg, rgba(255,107,26,0.12), rgba(11,123,92,0.07))', border: '1px solid rgba(255,107,26,0.18)', borderRadius: '18px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '180px', height: '180px', background: 'radial-gradient(circle, rgba(255,107,26,0.1), transparent 70%)', borderRadius: '50%' }} />
        <div style={{ fontSize: '21px', fontWeight: '700', marginBottom: '4px' }}>Kem cho, Rameshbhai! 🙏</div>
        <div style={{ fontSize: '13px', color: '#A8A6A0', marginBottom: '6px' }}>Here's what Saathi has for you today</div>
        <div style={{ fontSize: '13px', color: '#E8B84B', fontWeight: '500' }}>આજ · 3 reminders · ₹4,200 sales · 2 dues pending · Dal dhokli recipe ready</div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
        {[
          { icon: '💰', label: "TODAY'S SALES",   value: '₹4,200',  delta: '↑ ₹800 vs yesterday', color: '#52C47A' },
          { icon: '⚠️', label: 'DUES PENDING',    value: '₹11,500', delta: '3 customers',           color: '#E05252' },
          { icon: '💊', label: 'MEDICINES',        value: '2 / 3',   delta: '1 overdue — 8 AM',      color: '#E8B84B' },
          { icon: '🛡️', label: 'SHIELD ALERTS',   value: '2 Alerts',delta: 'Review now',             color: '#E05252' },
        ].map(s => (
          <div key={s.label} style={{ background: '#16161E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '16px' }}>
            <div style={{ fontSize: '22px', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{ fontSize: '10px', color: '#6A6870', fontWeight: '700', letterSpacing: '0.4px', marginBottom: '4px' }}>{s.label}</div>
            <div style={{ fontSize: '20px', fontWeight: '800', lineHeight: 1, marginBottom: '4px' }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: s.color }}>{s.delta}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' }}>
        {quickActions.map(qa => (
          <Link key={qa.label} href={qa.href} style={{ background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '16px 10px', textAlign: 'center', cursor: 'pointer', textDecoration: 'none', display: 'block', transition: 'border-color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,107,26,0.3)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}>
            <div style={{ fontSize: '24px', marginBottom: '6px' }}>{qa.emoji}</div>
            <div style={{ fontSize: '11px', color: '#A8A6A0', fontWeight: '500' }}>{qa.label}</div>
          </Link>
        ))}
      </div>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>

        {/* Reminders */}
        <div style={{ background: '#16161E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '18px' }}>
          <div style={{ fontSize: '10px', color: '#6A6870', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '14px' }}>TODAY'S REMINDERS</div>
          {reminders.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 0', borderBottom: i < reminders.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: statusDot[r.status], flexShrink: 0, boxShadow: `0 0 6px ${statusDot[r.status]}80` }} />
              <div style={{ flex: 1, fontSize: '13px', color: '#F0EFE8' }}>{r.title}</div>
              <div style={{ fontSize: '11px', color: '#6A6870', flexShrink: 0 }}>{r.time}</div>
              <span style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '10px', background: statusLabel[r.status].bg, color: statusLabel[r.status].color, fontWeight: '700', flexShrink: 0 }}>{r.status}</span>
            </div>
          ))}
        </div>

        {/* Saathi Says */}
        <div style={{ background: '#16161E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '18px' }}>
          <div style={{ fontSize: '10px', color: '#6A6870', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '14px' }}>SAATHI SAYS TODAY</div>
          <div style={{ fontSize: '13px', color: '#A8A6A0', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>🌅 <span style={{ color: '#F0EFE8', fontWeight: '600' }}>Morning:</span> Amrutbhai ni davai 8 AM hati — haju baki che. Reminder moku?</div>
            <div>📊 <span style={{ color: '#F0EFE8', fontWeight: '600' }}>Business:</span> Aaj ₹4,200 sale thayo. Suresh Traders ₹3,500 due 7 din se.</div>
            <div>🛡️ <span style={{ color: '#F0EFE8', fontWeight: '600' }}>Shield:</span> Suspicious payment alert — review karo abhi.</div>
            <div>🌙 <span style={{ color: '#F0EFE8', fontWeight: '600' }}>Tonight:</span> Dadi ni Vitamin D3 — 9 vage yaad rakhjo.</div>
          </div>
        </div>
      </div>

      {/* Voice commands */}
      <div style={{ background: '#16161E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '18px' }}>
        <div style={{ fontSize: '10px', color: '#6A6870', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '12px' }}>QUICK COMMANDS — TAP TO ASK SAATHI</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            ['🍽 Dal dhokli recipe tonight', 'Dal dhokli recipe step by step Gujarati mein batao'],
            ['📊 Full sales report',          'Aaj ka complete sales aur expense report batao'],
            ['💊 Medicine reminder',          'Amrutbhai ki medicine status check karo'],
            ['📞 Customer follow-up',         'Suresh Traders ne WhatsApp payment reminder bhejo'],
            ['🚨 Emergency help',             'Emergency — Dr. Patel ka number do aur ambulance call karo'],
            ['🛡️ Shield alerts',              'Aaj ke shield alerts review karo — kya suspicious activity hai'],
          ].map(([label, q]) => (
            <Link key={label} href={`/dashboard/chat?q=${encodeURIComponent(q)}`}
              style={{ fontSize: '12px', padding: '6px 12px', borderRadius: '20px', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.07)', color: '#A8A6A0', textDecoration: 'none', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,107,26,0.3)'; e.currentTarget.style.color = '#F0EFE8' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#A8A6A0' }}>
              {label}
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
