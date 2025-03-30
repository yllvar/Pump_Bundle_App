import fs from "fs"
import dotenv from "dotenv"
import metadata from "../metadata"
dotenv.config()

const PINATA_API_KEY = process.env.PINATA_API_KEY || ""
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY || ""
const imageName = "./upload/bolt.jpg"
const metadataName = "./upload/metadata.json"

async function uploadFileToPinata(filename: string, content: Buffer) {
  // Create form data for Pinata upload
  const formData = new FormData()
  formData.append("file", new Blob([content], { type: "application/octet-stream" }), filename)

  try {
    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_KEY,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Pinata upload failed: ${response.statusText}`)
    }

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error uploading to Pinata:", error)
    throw error
  }
}

export const getUploadedMetadataURI = async (): Promise<string> => {
  const fileContent = fs.readFileSync(imageName)

  try {
    const imageUploadResult = await uploadFileToPinata(imageName, fileContent)
    console.log("Image uploaded to IPFS:", imageUploadResult)
    console.log("IPFS URL:", `https://gateway.pinata.cloud/ipfs/${imageUploadResult.IpfsHash}`)

    const data = {
      name: metadata.name,
      symbol: metadata.symbol,
      description: metadata.description,
      image: `https://gateway.pinata.cloud/ipfs/${imageUploadResult.IpfsHash}`,
      showName: metadata.showName,
      createdOn: metadata.createdOn,
      twitter: metadata.twitter,
      telegram: metadata.telegram,
      website: metadata.website,
    }
    const metadataString = JSON.stringify(data)
    const bufferContent = Buffer.from(metadataString, "utf-8")
    fs.writeFileSync(metadataName, bufferContent)
    const metadataContent = fs.readFileSync(metadataName)

    const metadataUploadResult = await uploadFileToPinata(metadataName, metadataContent)
    console.log("File uploaded to IPFS:", metadataUploadResult)
    console.log("IPFS URL:", `https://gateway.pinata.cloud/ipfs/${metadataUploadResult.IpfsHash}`)
    return `https://gateway.pinata.cloud/ipfs/${metadataUploadResult.IpfsHash}`
  } catch (error) {
    console.error("Error in getUploadedMetadataURI:", error)
    return ""
  }
}

