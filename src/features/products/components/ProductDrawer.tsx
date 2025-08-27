import Drawer from '../../../components/Drawer'
import type { Product } from '../../../types'
import { useState } from 'react'
import Button from '../../../components/Button'
import Input from '../../../components/Input'

export function ProductDrawer({ open, onClose, product, onUpdateDemand, onTransferStock }: {
  open: boolean
  onClose: () => void
  product?: Product
  onUpdateDemand: (id: string, demand: number) => void
  onTransferStock: (id: string, warehouse: string, amount: number) => void
}) {
  const [demand, setDemand] = useState<number>(product?.demand ?? 0)
  const [move, setMove] = useState<number>(0)
  const [warehouse, setWarehouse] = useState<string>(product?.warehouse ?? '')

  if (!product) return null

  return (
    <Drawer open={open} onClose={onClose}>
      <div className="space-y-6">
        <div>
          <div className="text-sm text-gray-500">Product</div>
          <div className="text-lg font-semibold">{product.name}</div>
          <div className="text-xs text-gray-500">{product.sku} • {product.id}</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-500">Stock</div>
            <div className="text-xl font-semibold">{product.stock}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Demand</div>
            <div className="text-xl font-semibold">{product.demand}</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium">Update Demand</div>
          <div className="flex items-center gap-2">
            <Input type="number" min={0} value={demand} onChange={(e) => setDemand(parseInt(e.target.value || '0', 10))} />
            <Button disabled={Number.isNaN(demand) || demand < 0} onClick={() => onUpdateDemand(product.id, demand)}>Save</Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-medium">Transfer Stock</div>
          <div className="flex items-center gap-2">
            <Input placeholder="Warehouse" value={warehouse} onChange={(e) => setWarehouse(e.target.value)} />
            <Input type="number" min={0} placeholder="Amount" value={move} onChange={(e) => setMove(parseInt(e.target.value || '0', 10))} />
            <Button disabled={!warehouse || Number.isNaN(move) || move <= 0} onClick={() => onTransferStock(product.id, warehouse, move)}>Transfer</Button>
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default ProductDrawer


