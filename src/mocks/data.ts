import { faker } from '@faker-js/faker'

export interface ProductEntity {
  id: string
  name: string
  sku: string
  warehouse: string
  stock: number
  demand: number
}

export const products: ProductEntity[] = Array.from({ length: 120 }).map(() => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  sku: faker.string.alphanumeric(8).toUpperCase(),
  warehouse: faker.helpers.arrayElement([
    'North Hub',
    'South Hub',
    'East Hub',
    'West Hub',
    'Central DC',
  ]),
  stock: faker.number.int({ min: 0, max: 1000 }),
  demand: faker.number.int({ min: 0, max: 1000 }),
}))

export const warehouses: string[] = Array.from(
  new Set(products.map((p) => p.warehouse)),
).sort()

export function getStatus(stock: number, demand: number): 'Healthy' | 'Low' | 'Critical' {
  if (stock < demand) return 'Critical'
  if (stock === demand) return 'Low'
  return 'Healthy'
}


