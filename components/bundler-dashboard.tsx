"use client"

import { useState } from "react"
import { StatsSidebar } from "./stats-sidebar"
import { TokenBundler } from "./token-bundler"
import { TransactionPreview } from "./transaction-preview"
import type { TransactionHistory } from "../lib/types"

interface BundlerDashboardProps {
  isConnected: boolean
}

export function BundlerDashboard({ isConnected }: BundlerDashboardProps) {
  const [tokenAddresses, setTokenAddresses] = useState<string[]>(["", ""])
  const [stats, setStats] = useState({
    totalBundles: 24,
    successRate: "92%",
    gasSaved: "0.84 ETH",
    avgTokens: "3.5",
  })
  const [history, setHistory] = useState<TransactionHistory[]>([
    { id: 24, tokens: 3, status: "success" },
    { id: 23, tokens: 4, status: "success" },
    { id: 22, tokens: 2, status: "pending" },
    { id: 21, tokens: 5, status: "failed" },
  ])

  const handleAddToken = () => {
    setTokenAddresses([...tokenAddresses, ""])
  }

  const handleRemoveToken = (index: number) => {
    if (tokenAddresses.length > 1) {
      const newAddresses = [...tokenAddresses]
      newAddresses.splice(index, 1)
      setTokenAddresses(newAddresses)
    }
  }

  const handleTokenChange = (index: number, value: string) => {
    const newAddresses = [...tokenAddresses]
    newAddresses[index] = value
    setTokenAddresses(newAddresses)
  }

  const handleClearAll = () => {
    setTokenAddresses([""])
  }

  const handleBundleTransactions = () => {
    const validTokens = tokenAddresses.filter((addr) => addr.trim() !== "")

    if (validTokens.length === 0) {
      alert("Please add at least one token address")
      return
    }

    // In a real app, this would interact with a smart contract
    const newBundleId = stats.totalBundles + 1

    // Update stats
    const newAvgTokens = (Number.parseFloat(stats.avgTokens) * 0.9 + validTokens.length * 0.1).toFixed(1)
    setStats({
      ...stats,
      totalBundles: newBundleId,
      avgTokens: newAvgTokens,
    })

    // Add to history
    const newHistoryItem: TransactionHistory = {
      id: newBundleId,
      tokens: validTokens.length,
      status: "success",
    }
    setHistory([newHistoryItem, ...history])
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="md:col-span-1">
        <StatsSidebar stats={stats} history={history} />
      </div>
      <div className="md:col-span-2 flex flex-col gap-5">
        <TokenBundler
          tokenAddresses={tokenAddresses}
          onAddToken={handleAddToken}
          onRemoveToken={handleRemoveToken}
          onTokenChange={handleTokenChange}
          onClearAll={handleClearAll}
          onBundleTransactions={handleBundleTransactions}
          isConnected={isConnected}
        />
        <TransactionPreview tokenAddresses={tokenAddresses} />
      </div>
    </div>
  )
}

