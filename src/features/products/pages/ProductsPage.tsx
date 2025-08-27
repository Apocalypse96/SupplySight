import { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import ProductsTable from '../components/ProductsTable'
import ProductDrawer from '../components/ProductDrawer'
import Input from '../../../components/Input'
import Button from '../../../components/Button'
import { useQuery } from '@apollo/client/react'
import { GET_WAREHOUSES } from '../../dashboard/services/queries'
import { useEffect } from 'react'
import { useDebouncedValue } from '../../../lib/useDebounce'

export function ProductsPage() {
  const { products, loading, error, setFilters, filters, updateDemand, transferStock } = useProducts({ page: 1, limit: 10 })
  const [selected, setSelected] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [warehouse, setWarehouse] = useState<string>('')
  const { data: whData } = useQuery<{ warehouses: string[] }>(GET_WAREHOUSES)
  const debouncedSearch = useDebouncedValue(search, 300)

  useEffect(() => {
    setFilters({ ...filters, search: debouncedSearch, warehouse, status, page: 1 })
  }, [debouncedSearch, warehouse, status])

  const selectedProduct = products.find((p) => p.id === selected)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select
          className="block rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
          value={warehouse}
          onChange={(e) => setWarehouse(e.target.value)}
        >
          <option value="">All Warehouses</option>
          {whData?.warehouses?.map((w: string) => (
            <option key={w} value={w}>{w}</option>
          ))}
        </select>
        <select
          className="block rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="Healthy">Healthy</option>
          <option value="Low">Low</option>
          <option value="Critical">Critical</option>
        </select>
        <Button variant="secondary" onClick={() => { setSearch(''); setWarehouse(''); setStatus(''); setFilters({ ...filters, search: '', warehouse: '', status: '', page: 1 }) }}>Reset</Button>
      </div>

      {loading && <div className="text-sm text-gray-500">Loading products...</div>}
      {error && <div className="text-sm text-red-600">Error loading products</div>}
      <ProductsTable products={products} onRowClick={(p) => setSelected(p.id)} />

      <div className="flex items-center justify-between pt-2">
        <Button variant="secondary" disabled={filters.page <= 1} onClick={() => setFilters({ ...filters, page: Math.max(1, filters.page - 1) })}>Previous</Button>
        <div className="text-xs text-gray-500">Page {filters.page}</div>
        <Button variant="secondary" onClick={() => setFilters({ ...filters, page: filters.page + 1 })}>Next</Button>
      </div>

      <ProductDrawer
        open={!!selected}
        onClose={() => setSelected(null)}
        product={selectedProduct}
        onUpdateDemand={(id, demand) => updateDemand({ variables: { id, demand } })}
        onTransferStock={(id, warehouse, amount) => transferStock({ variables: { id, warehouse, amount } })}
      />
    </div>
  )
}

export default ProductsPage


