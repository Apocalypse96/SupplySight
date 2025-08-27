export const typeDefs = `#graphql
  type Product {
    id: ID!
    name: String!
    sku: String!
    warehouse: String!
    stock: Int!
    demand: Int!
  }

  type KPI {
    totalStock: Int!
    totalDemand: Int!
    fillRate: Float!
    trend: [TrendPoint!]!
  }

  type TrendPoint {
    date: String!
    stock: Int!
    demand: Int!
  }

  type Query {
    products(search: String, warehouse: String, status: String, page: Int, limit: Int): [Product!]!
    warehouses: [String!]!
    kpis(range: Int!): KPI!
  }

  type Mutation {
    updateDemand(id: ID!, demand: Int!): Product!
    transferStock(id: ID!, warehouse: String!, amount: Int!): Product!
  }
`


