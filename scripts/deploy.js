import { ethers } from "ethers"
import fs from "fs"
import path from "path"
import solc from "solc"
import dotenv from "dotenv"

dotenv.config()

async function main() {
  // Compile the contract
  const contractPath = path.resolve("contracts", "TokenBundler.sol")
  const contractSource = fs.readFileSync(contractPath, "utf8")

  // Prepare input for solc compiler
  const input = {
    language: "Solidity",
    sources: {
      "TokenBundler.sol": {
        content: contractSource,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["abi", "evm.bytecode"],
        },
      },
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  }

  console.log("Compiling contract...")
  const output = JSON.parse(solc.compile(JSON.stringify(input)))

  // Check for compilation errors
  if (output.errors) {
    output.errors.forEach((error) => {
      console.error(error.formattedMessage)
    })

    if (output.errors.some((error) => error.severity === "error")) {
      throw new Error("Compilation failed")
    }
  }

  const contractOutput = output.contracts["TokenBundler.sol"]["TokenBundler"]
  const abi = contractOutput.abi
  const bytecode = contractOutput.evm.bytecode.object

  // Connect to the network
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

  console.log(`Connected to network with address: ${wallet.address}`)

  // Deploy the contract
  console.log("Deploying contract...")
  const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet)
  const contract = await contractFactory.deploy()

  console.log(`Contract deployed to: ${contract.target}`)

  // Save the contract address and ABI
  const deploymentInfo = {
    address: contract.target,
    abi: abi,
    network: {
      name: process.env.NETWORK_NAME || "unknown",
      chainId: (await provider.getNetwork()).chainId,
    },
    deployer: wallet.address,
    timestamp: new Date().toISOString(),
  }

  const deploymentPath = path.resolve("deployments", `${process.env.NETWORK_NAME || "unknown"}.json`)

  // Create deployments directory if it doesn't exist
  if (!fs.existsSync(path.resolve("deployments"))) {
    fs.mkdirSync(path.resolve("deployments"))
  }

  // Write deployment info to file
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2))
  console.log(`Deployment info saved to: ${deploymentPath}`)

  console.log("Deployment completed successfully!")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

