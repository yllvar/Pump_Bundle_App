"use client"

import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useToast } from "./ui/use-toast"
import { Keypair, PublicKey } from "@solana/web3.js"
import { PumpFunSDK } from "../src/pumpfun"
import { connection } from "../src/config"
import { AnchorProvider } from "@coral-xyz/anchor"
import { NodeWallet } from "../src/nodeWallet"

export function SolanaIntegration() {
  const [tokenAddress, setTokenAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleBuy = async () => {
    if (!tokenAddress || !amount) {
      toast({
        title: "Error",
        description: "Please enter a token address and amount",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      // This is just a placeholder - in a real app, you'd get the keypair from wallet adapter
      const dummyKeypair = Keypair.generate()

      // Create provider and SDK
      const wallet = new NodeWallet(dummyKeypair)
      const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" })

      const sdk = new PumpFunSDK(provider)

      // Parse inputs
      const mint = new PublicKey(tokenAddress)
      const buyAmountSol = BigInt(Number.parseFloat(amount) * 1e9) // Convert to lamports

      // Execute buy transaction
      const result = await sdk.buy(
        dummyKeypair,
        mint,
        buyAmountSol,
        500n, // 5% slippage
        { unitLimit: 1000000, unitPrice: 1000 }, // Priority fee
      )

      if (result.success) {
        toast({
          title: "Success",
          description: `Transaction successful! Signature: ${result.signature}`,
        })
      } else {
        toast({
          title: "Error",
          description: `Transaction failed: ${result.error}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Buy error:", error)
      toast({
        title: "Error",
        description: `Failed to buy token: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSell = async () => {
    if (!tokenAddress || !amount) {
      toast({
        title: "Error",
        description: "Please enter a token address and amount",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      // This is just a placeholder - in a real app, you'd get the keypair from wallet adapter
      const dummyKeypair = Keypair.generate()

      // Create provider and SDK
      const wallet = new NodeWallet(dummyKeypair)
      const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" })

      const sdk = new PumpFunSDK(provider)

      // Parse inputs
      const mint = new PublicKey(tokenAddress)
      const sellTokenAmount = BigInt(Number.parseFloat(amount) * 1e6) // Convert to token decimals

      // Execute sell transaction
      const result = await sdk.sell(
        dummyKeypair,
        mint,
        sellTokenAmount,
        500n, // 5% slippage
        { unitLimit: 1000000, unitPrice: 1000 }, // Priority fee
      )

      if (result.success) {
        toast({
          title: "Success",
          description: `Transaction successful! Signature: ${result.signature}`,
        })
      } else {
        toast({
          title: "Error",
          description: `Transaction failed: ${result.error}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Sell error:", error)
      toast({
        title: "Error",
        description: `Failed to sell token: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-5 border border-gray-200 bg-white">
      <h2 className="text-lg font-medium mb-4 text-gray-900">Solana Token Trading</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="token-address">Token Address</Label>
          <Input
            id="token-address"
            placeholder="Enter Solana token address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            className="bg-white border-gray-300 text-gray-900"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-white border-gray-300 text-gray-900"
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleBuy}
            disabled={isLoading}
            className="flex-1 bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Buy Token
          </Button>

          <Button
            onClick={handleSell}
            disabled={isLoading}
            variant="outline"
            className="flex-1 bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            Sell Token
          </Button>
        </div>
      </div>
    </Card>
  )
}

