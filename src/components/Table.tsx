import { PropsWithChildren } from 'react'

export function Table({ children }: PropsWithChildren) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-card">
      <table className="min-w-full divide-y divide-gray-200">{children}</table>
    </div>
  )
}

export function THead({ children }: PropsWithChildren) {
  return (
    <thead className="bg-gray-50">
      <tr>{children}</tr>
    </thead>
  )
}

export function Th({ children }: PropsWithChildren) {
  return <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-600">{children}</th>
}

export function TBody({ children }: PropsWithChildren) {
  return <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
}

export function Tr({ children, className = '' }: PropsWithChildren<{ className?: string }>) {
  return <tr className={`hover:bg-gray-50 cursor-pointer ${className}`}>{children}</tr>
}

export function Td({ children }: PropsWithChildren) {
  return <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">{children}</td>
}

export default Table


