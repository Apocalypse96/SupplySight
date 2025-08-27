import { useQuery } from '@apollo/client/react'
import { GET_KPIS, GET_WAREHOUSES } from '../services/queries'
import type { KPI } from '../../../types'

export function useDashboard(range: number) {
  const kpi = useQuery<{ kpis: KPI }, { range: number }>(GET_KPIS, { variables: { range } })
  const warehouses = useQuery<{ warehouses: string[] }>(GET_WAREHOUSES)
  return { kpi, warehouses }
}


