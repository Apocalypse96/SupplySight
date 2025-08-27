import { useQuery } from '@apollo/client/react'
import { GET_KPIS, GET_WAREHOUSES } from '../services/queries'

export function useDashboard(range: number) {
  const kpi = useQuery(GET_KPIS, { variables: { range } })
  const warehouses = useQuery(GET_WAREHOUSES)
  return { kpi, warehouses }
}


