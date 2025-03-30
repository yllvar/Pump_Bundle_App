import { ethers } from "ethers"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"

dotenv.config()

async function main() {
  // Load deployment info
  const networkName = process.env.NETWORK_NAME || "unknown"
  const deploymentPath = path.resolve("deployments", `${networkName}.json`)

  if (!fs.existsSync(deploymentPath)) {
    throw new Error(`Deployment file not found for network: ${networkName}`)
  }

  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentPath, "utf8"))

  // Connect to the network
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

  console.log(`Connected to network with address: ${wallet.address}`)

  // Create contract instance
  const contract = new ethers.Contract(deploymentInfo.address, deploymentInfo.abi, wallet)

  // Example: Get contract stats
  const totalBundles = await contract.totalBundles()
  const totalTokensPurchased = await contract.totalTokensPurchased()

  console.log("Contract Stats:")
  console.log(`- Total Bundles: ${totalBundles}`)
  console.log(`- Total Tokens Purchased: ${totalTokensPurchased}`)

  // Example: Execute a bundle (this is just an example, adjust as needed)
  const tokenAddresses = ["0x1234567890123456789012345678901234567890", "0x0987654321098765432109876543210987654321"]
  const amounts = [ethers.parseUnits("1", 18), ethers.parseUnits("2", 18)]

  console.log("Executing bundle transaction...")

  try {
    const tx = await contract.executeBundle(tokenAddresses, amounts, { value: ethers.parseEther("0.001") })

    console.log(`Transaction hash: ${tx.hash}`)
    console.log("Waiting for confirmation...")

    const receipt = await tx.wait()
    console.log(`Transaction confirmed in block ${receipt.blockNumber}`)

    // Get updated stats
    const newTotalBundles = await contract.totalBundles()
    console.log(`New Total Bundles: ${newTotalBundles}`)
  } catch (error) {
    console.error("Error executing bundle:", error.message)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

