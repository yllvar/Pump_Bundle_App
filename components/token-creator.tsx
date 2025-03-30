"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { useToast } from "./ui/use-toast"
import { PumpFunSDK } from "../src/pumpfun"
import { connection } from "../src/config"
import { AnchorProvider } from "@coral-xyz/anchor"
import { NodeWallet } from "../src/nodeWallet"
import { Keypair } from "@solana/web3.js"

export function TokenCreator() {
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [description, setDescription] = useState("")
  const [twitter, setTwitter] = useState("")
  const [telegram, setTelegram] = useState("")
  const [website, setWebsite] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleCreateToken = async () => {
    if (!name || !symbol || !description || !file) {
      toast({
        title: "Error",
        description: "Please fill all required fields and upload an image",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      // This is just a placeholder - in a real app, you'd get the keypair from wallet adapter
      const creatorKeypair = Keypair.generate()
      const mintKeypair = Keypair.generate()

      // Create provider and SDK
      const wallet = new NodeWallet(creatorKeypair)
      const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" })

      const sdk = new PumpFunSDK(provider)
      // Convert File to Blob
      const fileBlob = new Blob([await file.arrayBuffer()], { type: file.type })

      // Create token metadata
      const tokenMetadata = {
        name,
        symbol,
        description,
        file: fileBlob,
        twitter,
        telegram,
        website,
      }

      // Create token with initial buy
      const result = await sdk.createAndBuy(
        creatorKeypair,
        mintKeypair,
        [creatorKeypair], // Initial buyers
        tokenMetadata,
        BigInt(0.1 * 1e9), // 0.1 SOL initial buy
        300n, // 3% slippage
        { unitLimit: 1000000, unitPrice: 1000 }, // Priority fee
      )

      toast({
        title: "Success",
        description: `Token created successfully! Mint address: ${mintKeypair.publicKey.toString()}`,
      })

      // Reset form
      setName("")
      setSymbol("")
      setDescription("")
      setTwitter("")
      setTelegram("")
      setWebsite("")
      setFile(null)
    } catch (error) {
      console.error("Token creation error:", error)
      toast({
        title: "Error",
        description: `Failed to create token: ${error instanceof Error ? error.message : String(error)}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-5 border border-gray-200 bg-white">
      <h2 className="text-lg font-medium mb-4 text-gray-900">Create New Token</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="token-name">Token Name</Label>
          <Input
            id="token-name"
            placeholder="Enter token name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white border-gray-300 text-gray-900"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="token-symbol">Token Symbol</Label>
          <Input
            id="token-symbol"
            placeholder="Enter token symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="bg-white border-gray-300 text-gray-900"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="token-description">Description</Label>
          <Textarea
            id="token-description"
            placeholder="Enter token description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white border-gray-300 text-gray-900"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="token-twitter">Twitter (optional)</Label>
          <Input
            id="token-twitter"
            placeholder="Twitter handle"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            className="bg-white border-gray-300 text-gray-900"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="token-telegram">Telegram (optional)</Label>
          <Input
            id="token-telegram"
            placeholder="Telegram group"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            className="bg-white border-gray-300 text-gray-900"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="token-website">Website (optional)</Label>
          <Input
            id="token-website"
            placeholder="Website URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="bg-white border-gray-300 text-gray-900"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="token-image">Token Image</Label>
          <Input
            id="token-image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="bg-white border-gray-300 text-gray-900"
          />
        </div>

        <Button
          onClick={handleCreateToken}
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
        >
          {isLoading ? "Creating..." : "Create Token"}
        </Button>
      </div>
    </Card>
  )
}

