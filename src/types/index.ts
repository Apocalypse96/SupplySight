export type ProductStatus = 'Healthy' | 'Low' | 'Critical'

export interface Product {
  id: string
  name: string
  sku: string
  warehouse: string
  stock: number
  demand: number
}

export interface TrendPoint {
  date: string
  stock: number
  demand: number
}

export interface KPI {
  totalStock: number
  totalDemand: number
  fillRate: number
  trend: TrendPoint[]
}


