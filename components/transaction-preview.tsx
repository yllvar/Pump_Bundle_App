"use client"

import { Card } from "./ui/card"
import { useEffect, useState } from "react"

interface TransactionPreviewProps {
  tokenAddresses: string[]
}

export function TransactionPreview({ tokenAddresses }: TransactionPreviewProps) {
  const [gasEstimate, setGasEstimate] = useState<string>("-")
  const [gasSavings, setGasSavings] = useState<string>("-")

  useEffect(() => {
    updateGasEstimates()
  }, [tokenAddresses])

  const updateGasEstimates = () => {
    const validTokens = tokenAddresses.filter((addr) => addr.trim() !== "")

    if (validTokens.length === 0) {
      setGasEstimate("-")
      setGasSavings("-")
      return
    }

    // Simulate gas estimation
    const baseGas = 50000
    const perTokenGas = 30000
    const totalGas = baseGas + validTokens.length * perTokenGas
    const separateGas = validTokens.length * (baseGas + perTokenGas)
    const savings = separateGas - totalGas
    const savingsPercentage = Math.round((savings / separateGas) * 100)

    setGasEstimate(`${totalGas.toLocaleString()} gas`)
    setGasSavings(`${savings.toLocaleString()} gas (${savingsPercentage}%)`)
  }

  const validTokens = tokenAddresses.filter((addr) => addr.trim() !== "")

  return (
    <Card className="p-5 border border-gray-200 bg-white">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Transaction Preview</h2>
      </div>

      <div className="p-4 bg-gray-50 rounded-md text-gray-600 text-sm mb-5">
        {validTokens.length === 0 ? (
          "Add token addresses to see transaction preview..."
        ) : (
          <>
            <div className="mb-2 font-medium">Bundling {validTokens.length} tokens into 1 transaction:</div>
            <ul className="pl-5">
              {validTokens.map((token, index) => (
                <li key={index} className="mb-1 break-all">
                  {token}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="p-4 bg-gray-50 rounded-md">
        <div className="flex justify-between mb-2 text-gray-700">
          <span>Estimated Gas:</span>
          <span>{gasEstimate}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Gas Savings:</span>
          <span>{gasSavings}</span>
        </div>
      </div>
    </Card>
  )
}

