import { ApolloProvider } from '@apollo/client/react'
import apolloClient from './apollo/client'
import AppShell from './layouts/AppShell'
import DashboardPage from './features/dashboard/pages/DashboardPage'
import ProductsPage from './features/products/pages/ProductsPage'
import { useState } from 'react'

function App() {
  const [tab, setTab] = useState<'dashboard' | 'products'>('dashboard')
  const [range, setRange] = useState<number>(7)
  return (
    <ApolloProvider client={apolloClient}>
      <AppShell range={range} onChangeRange={setRange}>
        <div className="mb-4 flex items-center gap-2">
          <button className={`text-sm ${tab === 'dashboard' ? 'font-semibold text-brand-700' : 'text-gray-600'}`} onClick={() => setTab('dashboard')}>Dashboard</button>
          <span className="text-gray-300">•</span>
          <button className={`text-sm ${tab === 'products' ? 'font-semibold text-brand-700' : 'text-gray-600'}`} onClick={() => setTab('products')}>Products</button>
        </div>
        {tab === 'dashboard' ? <DashboardPage range={range} /> : <ProductsPage />}
      </AppShell>
    </ApolloProvider>
  )
}

export default App
