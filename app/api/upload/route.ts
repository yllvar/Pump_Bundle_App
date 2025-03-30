import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Create a new FormData for Pinata
    const pinataFormData = new FormData()
    pinataFormData.append("file", file)

    // Add metadata if needed
    const metadata = {
      name: formData.get("name") as string,
      symbol: formData.get("symbol") as string,
      description: formData.get("description") as string,
      twitter: formData.get("twitter") as string,
      telegram: formData.get("telegram") as string,
      website: formData.get("website") as string,
      showName: formData.get("showName") as string,
    }

    pinataFormData.append(
      "pinataMetadata",
      JSON.stringify({
        name: `${metadata.name || "PumpFun Token"}`,
      }),
    )

    // Upload to Pinata
    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        pinata_api_key: process.env.PINATA_API_KEY || "",
        pinata_secret_api_key: process.env.PINATA_SECRET_KEY || "",
      },
      body: pinataFormData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Pinata error:", errorText)
      return NextResponse.json({ error: "Failed to upload to Pinata" }, { status: 500 })
    }

    const pinataResponse = await response.json()

    // Create metadata JSON
    const tokenMetadata = {
      name: metadata.name,
      symbol: metadata.symbol,
      description: metadata.description,
      image: `https://gateway.pinata.cloud/ipfs/${pinataResponse.IpfsHash}`,
      showName: metadata.showName === "true",
      twitter: metadata.twitter,
      telegram: metadata.telegram,
      website: metadata.website,
    }

    // Upload metadata JSON to Pinata
    const metadataResponse = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: process.env.PINATA_API_KEY || "",
        pinata_secret_api_key: process.env.PINATA_SECRET_KEY || "",
      },
      body: JSON.stringify(tokenMetadata),
    })

    if (!metadataResponse.ok) {
      const errorText = await metadataResponse.text()
      console.error("Pinata metadata error:", errorText)
      return NextResponse.json({ error: "Failed to upload metadata to Pinata" }, { status: 500 })
    }

    const metadataResult = await metadataResponse.json()

    return NextResponse.json({
      success: true,
      metadataUri: `https://gateway.pinata.cloud/ipfs/${metadataResult.IpfsHash}`,
      imageUri: `https://gateway.pinata.cloud/ipfs/${pinataResponse.IpfsHash}`,
    })
  } catch (error) {
    console.error("Error in upload API route:", error)
    return NextResponse.json({ error: "Failed to upload" }, { status: 500 })
  }
}

