import type { PropsWithChildren } from 'react'

export function Card({ children }: PropsWithChildren) {
  return <div className="rounded-xl bg-white shadow-card border border-gray-200">{children}</div>
}

export function CardHeader({ children }: PropsWithChildren) {
  return <div className="px-4 py-3 border-b border-gray-200">{children}</div>
}

export function CardContent({ children }: PropsWithChildren) {
  return <div className="px-4 py-4">{children}</div>
}

export default Card


