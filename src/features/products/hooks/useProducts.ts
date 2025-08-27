import { useMemo, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client/react'
import { GET_PRODUCTS, TRANSFER_STOCK, UPDATE_DEMAND } from '../services/queries'

export interface ProductFilters {
  search?: string
  warehouse?: string
  status?: string
  page: number
  limit: number
}

export function useProducts(initial: ProductFilters) {
  const [filters, setFilters] = useState<ProductFilters>(initial)
  const variables = useMemo(() => filters, [filters])

  const { data, loading, error, refetch } = useQuery(GET_PRODUCTS, { variables })

  const [updateDemand] = useMutation(UPDATE_DEMAND, {
    onCompleted: () => refetch(),
  })
  const [transferStock] = useMutation(TRANSFER_STOCK, {
    onCompleted: () => refetch(),
  })

  return {
    filters,
    setFilters,
    products: data?.products ?? [],
    loading,
    error,
    updateDemand,
    transferStock,
  }
}


