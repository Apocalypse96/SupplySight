import type { Product } from '../types'

export function getStatus(product: Product) {
  if (product.stock < product.demand) return 'Critical'
  if (product.stock === product.demand) return 'Low'
  return 'Healthy'
}


