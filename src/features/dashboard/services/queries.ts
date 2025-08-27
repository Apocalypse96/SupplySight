import { gql } from '@apollo/client'

export const GET_KPIS = gql`
  query GetKpis($range: Int!) {
    kpis(range: $range) {
      totalStock
      totalDemand
      fillRate
      trend { date stock demand }
    }
  }
`

export const GET_WAREHOUSES = gql`
  query GetWarehouses { warehouses }
`


