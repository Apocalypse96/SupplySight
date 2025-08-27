import Card, { CardContent, CardHeader } from '../../../components/Card'
import { LineChart as RLineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts'
import type { TrendPoint } from '../../../types'

export function LineChart({ data }: { data: TrendPoint[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="text-sm font-medium">Stock vs Demand</div>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <RLineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="stock" stroke="#4f46e5" dot={false} />
              <Line type="monotone" dataKey="demand" stroke="#dc2626" dot={false} />
            </RLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default LineChart


