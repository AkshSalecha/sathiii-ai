import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Saathi AI — India\'s Private Life OS',
  description: 'Your language. Your memory. Your trust. AI companion for Indian families, elders and businesses.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
