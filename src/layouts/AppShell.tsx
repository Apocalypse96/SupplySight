import { PropsWithChildren } from 'react'
import Button from '../components/Button'

export function AppShell({ children, range, onChangeRange }: PropsWithChildren & { range: number; onChangeRange: (r: number) => void }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded bg-brand-600" />
            <span className="text-sm font-semibold">SupplySight</span>
          </div>
          <div className="flex items-center gap-2">
            {[7,14,30].map((o) => (
              <Button key={o} variant={o===range ? 'primary' : 'secondary'} onClick={() => onChangeRange(o)}>{o}d</Button>
            ))}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl p-6">{children}</main>
    </div>
  )
}

export default AppShell


