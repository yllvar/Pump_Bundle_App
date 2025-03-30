"use client"

import { useState } from "react"
import { Header } from "../components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { BundlerDashboard } from "../components/bundler-dashboard"
import { SolanaIntegration } from "../components/solana-integration"
import { TokenCreator } from "../components/token-creator"

export default function Home() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | undefined>(undefined)

  const handleConnectWallet = () => {
    // In a real app, this would connect to a Solana wallet
    if (isConnected) {
      setIsConnected(false)
      setAddress(undefined)
    } else {
      setIsConnected(true)
      // Generate a random address for demo purposes
      setAddress("CuieVDEDtLo7FypA9SbLM9saXFdb1dsshEkyErMqkRQq")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <Header isConnected={isConnected} address={address} onConnectWallet={handleConnectWallet} />

        <Tabs defaultValue="bundler" className="mb-8">
          <TabsList className="grid grid-cols-3 mb-4 bg-gray-100">
            <TabsTrigger value="bundler" className="data-[state=active]:bg-white">
              Token Bundler
            </TabsTrigger>
            <TabsTrigger value="trading" className="data-[state=active]:bg-white">
              Solana Trading
            </TabsTrigger>
            <TabsTrigger value="creator" className="data-[state=active]:bg-white">
              Token Creator
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bundler">
            <BundlerDashboard isConnected={isConnected} />
          </TabsContent>

          <TabsContent value="trading">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-3">
                <SolanaIntegration />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="creator">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="md:col-span-3">
                <TokenCreator />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

