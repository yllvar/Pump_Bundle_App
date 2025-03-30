import type { Keypair, PublicKey, Transaction } from "@solana/web3.js"

/**
 * Simple wallet implementation for use with AnchorProvider
 */
export class NodeWallet {
  constructor(readonly payer: Keypair) {}

  async signTransaction(tx: Transaction): Promise<Transaction> {
    tx.partialSign(this.payer)
    return tx
  }

  async signAllTransactions(txs: Transaction[]): Promise<Transaction[]> {
    return txs.map((tx) => {
      tx.partialSign(this.payer)
      return tx
    })
  }

  get publicKey(): PublicKey {
    return this.payer.publicKey
  }
}

