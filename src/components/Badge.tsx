import { PropsWithChildren } from 'react'

export type BadgeVariant = 'green' | 'yellow' | 'red' | 'gray'

const map: Record<BadgeVariant, string> = {
  green: 'bg-green-50 text-green-700 ring-green-600/20',
  yellow: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
  red: 'bg-red-50 text-red-700 ring-red-600/20',
  gray: 'bg-gray-100 text-gray-700 ring-gray-600/20',
}

export function Badge({ children, variant = 'gray' }: PropsWithChildren<{ variant?: BadgeVariant }>) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${map[variant]}`}>
      {children}
    </span>
  )
}

export default Badge


