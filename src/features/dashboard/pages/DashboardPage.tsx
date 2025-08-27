import { useDashboard } from '../hooks/useDashboard'
import FiltersRow from '../components/FiltersRow'
import KpiCards from '../components/KpiCards'
import LineChart from '../components/LineChart'

export function DashboardPage({ range }: { range: number }) {
  const { kpi } = useDashboard(range)

  return (
    <div className="space-y-6">
      <FiltersRow />

      {kpi.loading && <div className="text-sm text-gray-500">Loading KPIs...</div>}
      {kpi.error && <div className="text-sm text-red-600">Error loading KPIs</div>}
      {kpi.data && (
        <>
          <KpiCards totalStock={kpi.data.kpis.totalStock} totalDemand={kpi.data.kpis.totalDemand} fillRate={kpi.data.kpis.fillRate} />
          <LineChart data={kpi.data.kpis.trend} />
        </>
      )}
    </div>
  )
}

export default DashboardPage


