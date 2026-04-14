'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ShieldPage() {
  const [toast, setToast] = useState('')
  const [alerts, setAlerts] = useState([
    { id: '1', type: 'UPI FRAUD ALERT', icon: '⚠️', time: 'Today 9:15 AM', resolved: false, msg: 'An unknown number asked you to transfer ₹15,000 claiming to be "Rajesh bhai\'s nephew" for an emergency. This matches known UPI fraud patterns. Do NOT transfer.' },
    { id: '2', type: 'FAKE BANK CALL', icon: '📞', time: 'Yesterday 7:30 PM', resolved: false, msg: 'You received 4 calls from +91 70XX-XXXXXX asking for your OTP, pretending to be a bank employee. Saathi blocked the call. Your accounts are safe.' },
  ])

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }
  const resolve = (id: string) => { setAlerts(p => p.map(a => a.id === id ? { ...a, resolved: true } : a)); showToast('✅ Alert resolved and dismissed') }

  const active = alerts.filter(a => !a.resolved)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {toast && <div style={{ position: 'fixed', top: '20px', right: '20px', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '12px 18px', fontSize: '13px', color: '#F0EFE8', zIndex: 999 }}>{toast}</div>}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(224,82,82,0.06)', border: '1px solid rgba(224,82,82,0.15)', borderRadius: '16px', padding: '20px' }}>
        <div style={{ fontSize: '36px' }}>🛡️</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '3px' }}>Trust Shield</div>
          <div style={{ fontSize: '13px', color: '#A8A6A0' }}>Saathi is monitoring for fraud, scams & risky actions in real-time</div>
        </div>
        <div style={{ background: 'rgba(224,82,82,0.1)', border: '1px solid rgba(224,82,82,0.2)', borderRadius: '10px', padding: '8px 14px', fontSize: '13px', color: '#E05252', fontWeight: '700' }}>
          {active.length} Active Alert{active.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>

        {/* Alerts */}
        <div>
          <div style={{ fontSize: '10px', color: '#6A6870', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '10px' }}>ACTIVE ALERTS</div>
          {alerts.map(a => (
            <div key={a.id} style={{ background: a.resolved ? '#16161E' : 'rgba(224,82,82,0.06)', border: `1px solid ${a.resolved ? 'rgba(255,255,255,0.07)' : 'rgba(224,82,82,0.22)'}`, borderRadius: '14px', padding: '16px', marginBottom: '10px', transition: 'all 0.3s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{ fontSize: '20px' }}>{a.icon}</div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: a.resolved ? '#6A6870' : '#E05252' }}>{a.type}</div>
                <div style={{ marginLeft: 'auto', fontSize: '11px', color: '#6A6870' }}>{a.time}</div>
              </div>
              <div style={{ fontSize: '12px', color: '#A8A6A0', lineHeight: '1.6', marginBottom: '12px' }}>{a.msg}</div>
              {!a.resolved ? (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={() => { resolve(a.id); showToast('🚫 Number blocked and reported to Saathi Shield') }} style={{ padding: '5px 10px', borderRadius: '7px', background: 'rgba(224,82,82,0.1)', color: '#E05252', border: '1px solid rgba(224,82,82,0.2)', fontSize: '11px', cursor: 'pointer', fontFamily: 'Sora, sans-serif' }}>Block & Report</button>
                  <button onClick={() => resolve(a.id)} style={{ padding: '5px 10px', borderRadius: '7px', background: 'rgba(82,196,122,0.1)', color: '#52C47A', border: '1px solid rgba(82,196,122,0.2)', fontSize: '11px', cursor: 'pointer', fontFamily: 'Sora, sans-serif' }}>I know them</button>
                  <Link href={`/dashboard/chat?q=${encodeURIComponent('Saathi, shield alert ke baare mein batao — kya karna chahiye?')}`} style={{ padding: '5px 10px', borderRadius: '7px', background: '#1E1E2A', color: '#A8A6A0', border: '1px solid rgba(255,255,255,0.08)', fontSize: '11px', cursor: 'pointer', textDecoration: 'none' }}>Ask Saathi</Link>
                </div>
              ) : (
                <div style={{ fontSize: '12px', color: '#52C47A', fontWeight: '600' }}>✅ Resolved</div>
              )}
            </div>
          ))}
          {active.length === 0 && <div style={{ background: 'rgba(82,196,122,0.07)', border: '1px solid rgba(82,196,122,0.18)', borderRadius: '14px', padding: '20px', textAlign: 'center', fontSize: '13px', color: '#52C47A' }}>🛡️ All clear! No active alerts.</div>}
        </div>

        {/* Protection status */}
        <div>
          <div style={{ fontSize: '10px', color: '#6A6870', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '10px' }}>PROTECTION STATUS</div>
          <div style={{ background: '#16161E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '18px', marginBottom: '12px' }}>
            {[
              { icon: '🔒', label: 'UPI Fraud Shield',          sub: 'Alerts on unknown payment requests' },
              { icon: '📱', label: 'Call Screening',             sub: 'Blocks known scam patterns' },
              { icon: '💊', label: 'Elder Vulnerability Guard',  sub: 'Extra protection for Amrutbhai' },
              { icon: '📊', label: 'Business Anomaly Detection', sub: 'Unusual expenses & orders' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '9px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div style={{ fontSize: '18px' }}>{p.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: '500' }}>{p.label}</div>
                  <div style={{ fontSize: '11px', color: '#6A6870' }}>{p.sub}</div>
                </div>
                <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '10px', background: 'rgba(82,196,122,0.08)', border: '1px solid rgba(82,196,122,0.15)', color: '#52C47A', fontWeight: '600' }}>Active</span>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(82,196,122,0.05)', border: '1px solid rgba(82,196,122,0.15)', borderRadius: '14px', padding: '16px' }}>
            <div style={{ fontSize: '13px', color: '#52C47A', fontWeight: '600', marginBottom: '6px' }}>✓ This week: 7 threats blocked</div>
            <div style={{ fontSize: '12px', color: '#A8A6A0', lineHeight: '1.7' }}>
              3 UPI fraud attempts · 2 phishing calls · 1 fake order · 1 suspicious medicine refund request
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
