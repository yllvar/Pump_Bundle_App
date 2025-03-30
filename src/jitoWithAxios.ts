import type { VersionedTransaction } from "@solana/web3.js"
import bs58 from "bs58"

export async function jitoWithAxios(transactions: VersionedTransaction[]): Promise<string> {
  try {
    const serializedTransactions = transactions.map((tx) => bs58.encode(tx.serialize()))

    const response = await fetch("/api/bundle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transactions: serializedTransactions,
      }),
    })

    const data = await response.json()
    return data.uuid
  } catch (error) {
    console.error("Error submitting bundle to Jito:", error)
    throw error
  }
}

