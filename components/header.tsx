"use client"

import { Bolt } from "lucide-react"
import { Button } from "./ui/button"
import { shortenAddress } from "../lib/utils"

interface HeaderProps {
  isConnected: boolean
  address?: string
  onConnectWallet: () => void
}

export function Header({ isConnected, address, onConnectWallet }: HeaderProps) {
  return (
    <header className="flex justify-between items-center py-4 border-b border-gray-200 mb-8">
      <div className="flex items-center gap-2 text-2xl font-bold text-gray-900">
        <Bolt className="h-7 w-7 text-indigo-600" />
        <span>PumpFun Bundler</span>
      </div>
      <Button onClick={onConnectWallet} className="bg-indigo-600 hover:bg-indigo-700 text-white">
        {isConnected && address ? shortenAddress(address) : "Connect Wallet"}
      </Button>
    </header>
  )
}

