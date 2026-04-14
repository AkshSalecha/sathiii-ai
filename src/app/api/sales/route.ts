import { NextRequest, NextResponse } from 'next/server'

// In-memory store for demo (replace with DB in production)
const sales: Array<{id: string; name: string; amount: number; mode: string; time: string; type: string}> = [
  { id: '1', name: 'Rajeshbhai order', amount: 1800, mode: 'Cash', time: '10:30 AM', type: 'income' },
  { id: '2', name: 'Suresh Traders', amount: 1200, mode: 'UPI', time: '12:00 PM', type: 'income' },
  { id: '3', name: 'Meena Devi', amount: 1200, mode: 'Cash', time: '2:00 PM', type: 'income' },
  { id: '4', name: 'Stock purchase', amount: 850, mode: 'NEFT', time: '9:00 AM', type: 'expense' },
  { id: '5', name: 'Transport', amount: 250, mode: 'Cash', time: '11:00 AM', type: 'expense' },
]

export async function GET() {
  const totalSales = sales.filter(s => s.type === 'income').reduce((a, s) => a + s.amount, 0)
  const totalExp = sales.filter(s => s.type === 'expense').reduce((a, s) => a + s.amount, 0)
  return NextResponse.json({ sales, summary: { totalSales, totalExp, profit: totalSales - totalExp } })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const entry = { id: Date.now().toString(), name: body.name || 'Customer', amount: parseFloat(body.amount), mode: body.mode || 'Cash', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), type: body.type || 'income' }
  sales.unshift(entry)
  return NextResponse.json({ success: true, entry }, { status: 201 })
}
