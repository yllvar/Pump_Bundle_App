"use client"

import { Plus, Trash2, BrushIcon as Broom, CuboidIcon as Cube } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Input } from "./ui/input"

interface TokenBundlerProps {
  tokenAddresses: string[]
  onAddToken: () => void
  onRemoveToken: (index: number) => void
  onTokenChange: (index: number, value: string) => void
  onClearAll: () => void
  onBundleTransactions: () => void
  isConnected: boolean
}

export function TokenBundler({
  tokenAddresses,
  onAddToken,
  onRemoveToken,
  onTokenChange,
  onClearAll,
  onBundleTransactions,
  isConnected,
}: TokenBundlerProps) {
  return (
    <Card className="p-5 border border-gray-200 bg-white">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Token Bundler</h2>
      </div>

      <p className="mb-5 text-gray-600">
        Add multiple token addresses below to bundle your purchases into a single transaction.
      </p>

      <div className="flex flex-col gap-3 mb-4">
        {tokenAddresses.map((address, index) => (
          <div key={index} className="flex gap-2">
            <Input
              type="text"
              className="flex-1 bg-white border-gray-300 text-gray-900"
              placeholder="Token contract address (0x...)"
              value={address}
              onChange={(e) => onTokenChange(index, e.target.value)}
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onRemoveToken(index)}
              disabled={tokenAddresses.length <= 1}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="mb-5 bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        onClick={onAddToken}
      >
        <Plus className="mr-2 h-4 w-4" /> Add Another Token
      </Button>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          className="bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          onClick={onClearAll}
        >
          <Broom className="mr-2 h-4 w-4" /> Clear All
        </Button>
        <Button
          className="bg-indigo-600 text-white hover:bg-indigo-700 flex-1"
          onClick={onBundleTransactions}
          disabled={!isConnected}
        >
          <Cube className="mr-2 h-4 w-4" /> Bundle Transactions
        </Button>
      </div>
    </Card>
  )
}

