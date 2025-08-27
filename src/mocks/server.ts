import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { typeDefs } from './schema'
import { products, warehouses, getStatus } from './data'

const DEFAULT_DELAY_MS = Number.isNaN(Number(process.env.MOCK_DELAY_MS)) ? 0 : Number(process.env.MOCK_DELAY_MS)
const DEFAULT_FAIL_RATE = Number.isNaN(Number(process.env.MOCK_FAIL_RATE)) ? 0 : Number(process.env.MOCK_FAIL_RATE)

async function simulateNetwork(req: any) {
  const headerDelay = Number(req?.headers?.['x-delay-ms'])
  const delayMs = Number.isNaN(headerDelay) ? DEFAULT_DELAY_MS : headerDelay
  if (delayMs > 0) {
    await new Promise((r) => setTimeout(r, delayMs))
  }
  const headerFail = req?.headers?.['x-fail']
  const shouldFail = headerFail === '1' || headerFail === 'true' || Math.random() < DEFAULT_FAIL_RATE
  if (shouldFail) {
    throw new Error('Simulated network error')
  }
}

const withSim = (fn: any) => async (parent: any, args: any, ctx: any, info: any) => {
  await simulateNetwork(ctx.req)
  return fn(parent, args, ctx, info)
}

const resolvers = {
  Query: {
    products: withSim((_: unknown, args: { search?: string; warehouse?: string; status?: string; page?: number; limit?: number }) => {
      const { search = '', warehouse = '', status = '', page = 1, limit = 10 } = args
      let list = products.slice()
      if (search) {
        const q = search.toLowerCase()
        list = list.filter((p) =>
          p.id.toLowerCase().startsWith(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q),
        )
      }
      if (warehouse) list = list.filter((p) => p.warehouse === warehouse)
      if (status) list = list.filter((p) => getStatus(p.stock, p.demand) === status)
      const start = Math.max(0, (page - 1) * limit)
      const end = start + limit
      return list.slice(start, end)
    }),
    warehouses: withSim(() => warehouses),
    kpis: withSim((_: unknown, args: { range: number }) => {
      const totalStock = products.reduce((a, b) => a + b.stock, 0)
      const totalDemand = products.reduce((a, b) => a + b.demand, 0)
      const fillRate = totalStock === 0 ? 0 : Math.min(1, totalStock / Math.max(1, totalDemand))
      const today = new Date()
      const trend = Array.from({ length: Math.max(1, args.range) }).map((_, i) => {
        const d = new Date(today)
        d.setDate(today.getDate() - (args.range - 1 - i))
        return {
          date: d.toISOString().slice(0, 10),
          stock: Math.max(0, Math.round(totalStock / 100 + Math.sin(i) * 50)),
          demand: Math.max(0, Math.round(totalDemand / 100 + Math.cos(i) * 50)),
        }
      })
      return { totalStock, totalDemand, fillRate, trend }
    }),
  },
  Mutation: {
    updateDemand: withSim((_: unknown, args: { id: string; demand: number }) => {
      const p = products.find((x) => x.id === args.id)
      if (!p) throw new Error('Not found')
      p.demand = Math.max(0, Math.floor(args.demand))
      return p
    }),
    transferStock: withSim((_: unknown, args: { id: string; warehouse: string; amount: number }) => {
      const p = products.find((x) => x.id === args.id)
      if (!p) throw new Error('Not found')
      const amt = Math.max(0, Math.floor(args.amount))
      p.stock = Math.max(0, p.stock - amt)
      if (args.warehouse) p.warehouse = args.warehouse
      return p
    }),
  },
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const server = new ApolloServer({ schema })

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => ({ req }),
})
console.log(`🚀 Mock server ready at ${url}`)


