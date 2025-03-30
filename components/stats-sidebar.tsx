import { CuboidIcon as Cube } from "lucide-react"
import { Card } from "./ui/card"
import type { TransactionHistory } from "../lib/types"

interface StatsSidebarProps {
  stats: {
    totalBundles: number
    successRate: string
    gasSaved: string
    avgTokens: string
  }
  history: TransactionHistory[]
}

export function StatsSidebar({ stats, history }: StatsSidebarProps) {
  return (
    <Card className="p-5 border border-gray-200 bg-white">
      <h3 className="text-lg font-medium mb-4 text-gray-900">Dashboard Overview</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard label="Total Bundles" value={stats.totalBundles.toString()} />
        <StatCard label="Success Rate" value={stats.successRate} />
        <StatCard label="Gas Saved" value={stats.gasSaved} />
        <StatCard label="Avg. Tokens" value={stats.avgTokens} />
      </div>

      <h3 className="text-lg font-medium mb-4 text-gray-900">Recent Activity</h3>
      <div className="flex flex-col">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
          >
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Cube className="h-4 w-4" />
              <span>
                Bundle #{item.id} - {item.tokens} token{item.tokens !== 1 ? "s" : ""}
              </span>
            </div>
            <StatusBadge status={item.status} />
          </div>
        ))}
      </div>
    </Card>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg text-center">
      <div className="text-gray-600 text-xs">{label}</div>
      <div className="text-2xl font-bold text-indigo-600 my-2">{value}</div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const getStatusClasses = () => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-600"
      case "failed":
        return "bg-red-100 text-red-600"
      case "pending":
        return "bg-amber-100 text-amber-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusClasses()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

