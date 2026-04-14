'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV = [
  { href: '/dashboard/family', label: 'Home OS', icon: '🏠' },
  { href: '/dashboard/chat', label: 'Saathi Chat', icon: '💬', badge: '3' },
  { href: '/dashboard/elder', label: 'Elder Care', icon: '🧓' },
  { href: '/dashboard/business', label: 'Business OS', icon: '📊' },
  { href: '/dashboard/vault', label: 'Secure Vault', icon: '🔐' },
  { href: '/dashboard/shield', label: 'Trust Shield', icon: '🛡️', badge: '2', danger: true },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const titles: Record<string, [string, string]> = {
    '/dashboard/family': ['Good morning, Rameshbhai 🙏', 'Home OS · Full day overview'],
    '/dashboard/chat': ['Saathi Chat', 'Ask anything in your language'],
    '/dashboard/elder': ['Elder Care OS', 'Amrutbhai · Medicines · Emergency'],
    '/dashboard/business': ['Business OS', 'Ramesh General Store · Sales · Dues'],
    '/dashboard/vault': ['Secure Vault', 'End-to-end encrypted · Your control'],
    '/dashboard/shield': ['Trust Shield', '2 active alerts · All protection on'],
  }
  const [title, sub] = titles[pathname] || ['Saathi AI', 'Your private Life OS']

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#0F0F14', overflow: 'hidden', fontFamily: 'Sora, sans-serif' }}>

      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '12px 18px', fontSize: '13px', color: '#F0EFE8', zIndex: 999, boxShadow: '0 8px 32px rgba(0,0,0,0.5)', maxWidth: '300px' }}>
          {toast}
        </div>
      )}

      {/* SIDEBAR */}
      <aside style={{ width: '252px', flexShrink: 0, background: '#16161E', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', padding: '20px 0' }}>

        {/* Logo */}
        <div style={{ padding: '0 18px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <div style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg, #FF6B1A, #C94E00)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', boxShadow: '0 4px 14px rgba(255,107,26,0.4)' }}>🙏</div>
            <span style={{ fontSize: '19px', fontWeight: '800', background: 'linear-gradient(90deg, #fff, #FFB480)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Saathi</span>
          </div>
          <div style={{ fontSize: '10px', color: '#3A3840', letterSpacing: '1px', fontWeight: '700' }}>PRIVATE LIFE OS · INDIA</div>
        </div>

        {/* User card */}
        <div style={{ margin: '16px 14px 0', background: '#1E1E2A', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #FF9A3C, #E05252)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', border: '2px solid rgba(255,107,26,0.3)', flexShrink: 0 }}>🧓</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#F0EFE8' }}>Rameshbhai</div>
            <div style={{ fontSize: '11px', color: '#6A6870' }}>Ahmedabad · Elder Guide</div>
            <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
              {['ગુજ', 'हिं'].map(l => <span key={l} style={{ fontSize: '9px', padding: '1px 5px', borderRadius: '10px', background: 'rgba(255,107,26,0.12)', color: '#FF6B1A', border: '1px solid rgba(255,107,26,0.2)', fontWeight: '700' }}>{l}</span>)}
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 14px 0' }}>
          <div style={{ fontSize: '10px', color: '#3A3840', fontWeight: '700', letterSpacing: '1px', marginBottom: '8px', paddingLeft: '8px' }}>MAIN</div>
          {NAV.map(item => (
            <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '10px', marginBottom: '2px', fontSize: '13px', fontWeight: '500', textDecoration: 'none', border: '1px solid transparent', transition: 'all 0.15s',
              background: pathname === item.href ? 'rgba(255,107,26,0.1)' : 'transparent',
              color: pathname === item.href ? '#FF6B1A' : '#A8A6A0',
              borderColor: pathname === item.href ? 'rgba(255,107,26,0.2)' : 'transparent',
            }}>
              <span style={{ fontSize: '15px', width: '20px', textAlign: 'center' }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && <span style={{ fontSize: '10px', padding: '1px 6px', borderRadius: '10px', fontWeight: '700', background: item.danger ? '#E05252' : '#FF6B1A', color: 'white' }}>{item.badge}</span>}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding: '16px 14px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ background: 'rgba(82,196,122,0.06)', border: '1px solid rgba(82,196,122,0.18)', borderRadius: '10px', padding: '9px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#52C47A', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: '11px', color: '#52C47A', fontWeight: '500' }}>Encrypted · Secure · Live</span>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Topbar */}
        <header style={{ background: '#16161E', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '17px', fontWeight: '600', color: '#F0EFE8' }}>{title}</div>
            <div style={{ fontSize: '11px', color: '#6A6870', marginTop: '2px' }}>{sub}</div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button onClick={() => showToast('🔔 3 reminders today — medicine, payment follow-up, doctor appointment')} className="btn-ghost" style={{ fontSize: '12px' }}>🔔 3 Reminders</button>
            <Link href="/dashboard/chat" className="btn-primary" style={{ fontSize: '12px' }}>+ Ask Saathi</Link>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
