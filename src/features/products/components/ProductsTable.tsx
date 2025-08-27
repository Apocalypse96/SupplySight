import type { Product } from '../../../types'
import Table, { THead, Th, TBody, Tr, Td } from '../../../components/Table'
import Badge from '../../../components/Badge'
import { getStatus } from '../../../lib/status'

export function ProductsTable({ products, onRowClick }: { products: Product[]; onRowClick: (p: Product) => void }) {
  return (
    <Table>
      <THead>
        <Th>ID</Th>
        <Th>Name</Th>
        <Th>SKU</Th>
        <Th>Warehouse</Th>
        <Th>Stock</Th>
        <Th>Demand</Th>
        <Th>Status</Th>
      </THead>
      <TBody>
        {products.map((p) => {
          const status = getStatus(p)
          return (
            <Tr key={p.id} className={status === 'Critical' ? 'bg-red-50 hover:bg-red-100' : ''}>
              <Td onClick={() => onRowClick(p)}>{p.id.slice(0, 8)}</Td>
              <Td onClick={() => onRowClick(p)}>{p.name}</Td>
              <Td onClick={() => onRowClick(p)}>{p.sku}</Td>
              <Td onClick={() => onRowClick(p)}>{p.warehouse}</Td>
              <Td onClick={() => onRowClick(p)}>{p.stock}</Td>
              <Td onClick={() => onRowClick(p)}>{p.demand}</Td>
              <Td>
                {status === 'Healthy' && <Badge variant="green">Healthy</Badge>}
                {status === 'Low' && <Badge variant="yellow">Low</Badge>}
                {status === 'Critical' && <Badge variant="red">Critical</Badge>}
              </Td>
            </Tr>
          )
        })}
      </TBody>
    </Table>
  )
}

export default ProductsTable


