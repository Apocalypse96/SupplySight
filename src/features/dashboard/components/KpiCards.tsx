import Card, { CardContent, CardHeader } from '../../../components/Card'

export function KpiCards({ totalStock, totalDemand, fillRate }: { totalStock: number, totalDemand: number, fillRate: number }) {
  const items = [
    { label: 'Total Stock', value: totalStock.toLocaleString() },
    { label: 'Total Demand', value: totalDemand.toLocaleString() },
    { label: 'Fill Rate', value: `${(fillRate * 100).toFixed(1)}%` },
  ]
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.map(({ label, value }) => (
        <Card key={label}>
          <CardHeader>
            <div className="text-xs uppercase text-gray-500">{label}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default KpiCards


