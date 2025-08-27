import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query GetProducts($search: String, $warehouse: String, $status: String, $page: Int, $limit: Int) {
    products(search: $search, warehouse: $warehouse, status: $status, page: $page, limit: $limit) {
      id
      name
      sku
      warehouse
      stock
      demand
    }
  }
`

export const UPDATE_DEMAND = gql`
  mutation UpdateDemand($id: ID!, $demand: Int!) { updateDemand(id: $id, demand: $demand) { id demand stock } }
`

export const TRANSFER_STOCK = gql`
  mutation TransferStock($id: ID!, $warehouse: String!, $amount: Int!) { transferStock(id: $id, warehouse: $warehouse, amount: $amount) { id warehouse stock } }
`


