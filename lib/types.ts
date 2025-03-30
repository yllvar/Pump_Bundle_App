export interface TransactionHistory {
  id: number
  tokens: number
  status: "success" | "pending" | "failed"
}

