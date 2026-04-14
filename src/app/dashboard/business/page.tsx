'use client'
import { useState } from 'react'
import Link from 'next/link'

type Entry = { name: string; time: string; mode: string; amount: number; type: 'income' | 'expense' }

const INIT: Entry[] = [
  { name: 'Rajeshbhai order', time: '10:30 AM', mode: 'Cash', amount: 1800, type: 'income' },
  { name: 'Suresh Traders',   time: '12:00 PM', mode: 'UPI',  amount: 1200, type: 'income' },
  { name: 'Meena Devi',       time: '2:00 PM',  mode: 'Cash', amount: 1200, type: 'income' },
  { name: 'Stock purchase',   time: '9:00 AM',  mode: 'NEFT', amount: 850,  type: 'expense' },
  { name: 'Transport',        time: '11:00 AM', mode: 'Cash', amount: 250,  type: 'expense' },
]

const DUES = [
  { name: 'Suresh Traders', days: 7,  amount: 3500 },
  { name: 'Harshbhai Mehta',days: 12, amount: 5000 },
  { name: 'Priyaben Shah',  days: 3,  amount: 3000 },
]

export default function BusinessPage() {
  const [ledger, setLedger] = useState<Entry[]>(INIT)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', amount: '', mode: 'Cash', type: 'income' })
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const totalSales = ledger.filter(e => e.type === 'income').reduce((a, e) => a + e.amount, 0)
  const totalExp   = ledger.filter(e => e.type === 'expense').reduce((a, e) => a + e.amount, 0)
  const totalDues  = DUES.reduce((a, d) => a + d.amount, 0)

  const addEntry = async () => {
    if (!form.name || !form.amount) return showToast('⚠️ Name aur amount dono bharein!')
    const entry: Entry = {
      name: form.name,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      mode: form.mode,
      amount: parseFloat(form.amount),
      type: form.type as 'income' | 'expense',
    }
    try {
      await fetch('/api/sales', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(entry) })
    } catch {}
    setLedger(prev => [entry, ...prev])
    setForm({ name: '', amount: '', mode: 'Cash', type: 'income' })
    setShowForm(false)
    showToast('✅ Entry ledger mein add ho gayi!')
  }

  const s = { padding: '7px 12px', borderRadius: '8px', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.1)', color: '#F0EFE8', fontSize: '13px', fontFamily: 'Sora, sans-serif', outline: 'none', width: '100%' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {toast && <div style={{ position: 'fixed', top: '20px', right: '20px', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '12px 18px', fontSize: '13px', color: '#F0EFE8', zIndex: 999 }}>{toast}</div>}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' }}>
        {[
          { icon: '💰', label: 'TODAY SALES',  value: `₹${totalSales.toLocaleString('en-IN')}`, delta: '↑ ₹800 vs yesterday', color: '#52C47A' },
          { icon: '💸', label: 'EXPENSES',     value: `₹${totalExp.toLocaleString('en-IN')}`,   delta: `${ledger.filter(e=>e.type==='expense').length} entries`, color: '#A8A6A0' },
          { icon: '✅', label: 'NET PROFIT',   value: `₹${(totalSales - totalExp).toLocaleString('en-IN')}`, delta: 'Today', color: '#52C47A' },
          { icon: '⚠️', label: 'DUES PENDING', value: `₹${totalDues.toLocaleString('en-IN')}`, delta: `${DUES.length} customers`, color: '#E05252' },
        ].map(s => (
          <div key={s.label} style={{ background: '#16161E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '16px' }}>
            <div style={{ fontSize: '22px', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{ fontSize: '10px', color: '#6A6870', fontWeight: '700', letterSpacing: '0.4px', marginBottom: '4px' }}>{s.label}</div>
            <div style={{ fontSize: '20px', fontWeight: '800' }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: s.color, marginTop: '3px' }}>{s.delta}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>

        {/* Ledger */}
        <div style={{ background: '#16161E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ fontSize: '10px', color: '#6A6870', fontWeight: '700', letterSpacing: '0.5px' }}>TODAY'S LEDGER</div>
            <button onClick={() => setShowForm(v => !v)} style={{ padding: '6px 12px', borderRadius: '8px', background: '#FF6B1A', color: 'white', border: 'none', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Sora, sans-serif' }}>+ Add entry</button>
          </div>

          {showForm && (
            <div style={{ background: '#1E1E2A', border: '1px solid rgba(255,107,26,0.18)', borderRadius: '12px', padding: '14px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input style={s} placeholder="Customer name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
              <input style={s} placeholder="Amount ₹" type="number" value={form.amount} onChange={e => setForm(p => ({ ...p, amount: e.target.value }))} />
              <select style={s} value={form.mode} onChange={e => setForm(p => ({ ...p, mode: e.target.value }))}>
                <option>Cash</option><option>UPI</option><option>NEFT</option><option>Credit</option>
              </select>
              <select style={s} value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                <option value="income">💰 Income / Sale</option><option value="expense">💸 Expense</option>
              </select>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={addEntry} style={{ flex: 1, padding: '8px', borderRadius: '8px', background: '#FF6B1A', color: 'white', border: 'none', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: 'Sora, sans-serif' }}>Save entry</button>
                <button onClick={() => setShowForm(false)} style={{ flex: 1, padding: '8px', borderRadius: '8px', background: '#252535', color: '#A8A6A0', border: '1px solid rgba(255,255,255,0.08)', fontSize: '12px', cursor: 'pointer', fontFamily: 'Sora, sans-serif' }}>Cancel</button>
              </div>
            </div>
          )}

          {ledger.map((e, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '9px 0', borderBottom: i < ledger.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: '500' }}>{e.name}</div>
                <div style={{ fontSize: '11px', color: '#6A6870' }}>{e.time} · {e.mode}</div>
              </div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: e.type === 'income' ? '#52C47A' : '#E05252' }}>
                {e.type === 'income' ? '+' : '−'}₹{e.amount.toLocaleString('en-IN')}
              </div>
            </div>
          ))}
        </div>

        {/* Dues */}
        <div style={{ background: '#16161E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', padding: '18px' }}>
          <div style={{ fontSize: '10px', color: '#6A6870', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '14px' }}>DUES — FOLLOW UP NEEDED</div>
          {DUES.map((d, i) => (
            <div key={i} style={{ background: '#1E1E2A', border: '1px solid rgba(224,82,82,0.1)', borderRadius: '10px', padding: '12px 14px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '600' }}>{d.name}</div>
                <div style={{ fontSize: '11px', color: '#E05252' }}>{d.days} days overdue</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#E05252' }}>₹{d.amount.toLocaleString('en-IN')}</div>
                <button onClick={() => showToast(`📱 WhatsApp reminder sent to ${d.name}!`)} style={{ padding: '4px 10px', borderRadius: '7px', background: 'rgba(224,82,82,0.1)', color: '#E05252', border: '1px solid rgba(224,82,82,0.2)', fontSize: '11px', cursor: 'pointer', fontFamily: 'Sora, sans-serif' }}>Follow up →</button>
              </div>
            </div>
          ))}
          <div style={{ background: 'rgba(255,107,26,0.05)', border: '1px solid rgba(255,107,26,0.12)', borderRadius: '10px', padding: '10px 12px', fontSize: '12px', color: '#A8A6A0', marginTop: '4px' }}>
            💡 Saathi can send WhatsApp reminders or make voice calls in Gujarati automatically
          </div>

          <div style={{ marginTop: '14px' }}>
            <div style={{ fontSize: '10px', color: '#6A6870', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '10px' }}>VOICE COMMANDS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {['📊 Full report', '📅 Weekly summary', '📦 Stock check', '📱 WhatsApp status', '🧾 GST summary'].map(cmd => (
                <Link key={cmd} href={`/dashboard/chat?q=${encodeURIComponent(cmd.replace(/[^\w\s]/g, '').trim())}`} style={{ fontSize: '11px', padding: '5px 10px', borderRadius: '16px', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.07)', color: '#A8A6A0', textDecoration: 'none' }}>
                  {cmd}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
