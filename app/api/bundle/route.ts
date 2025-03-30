import { NextResponse } from "next/server"
import { BLOCKENGINE_URL, JITO_AUTH_KEYPAIR } from "../../src/constants"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const response = await fetch(`https://${BLOCKENGINE_URL}/v1/bundles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JITO_AUTH_KEYPAIR}`,
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in bundle API route:", error)
    return NextResponse.json({ error: "Failed to submit bundle" }, { status: 500 })
  }
}

