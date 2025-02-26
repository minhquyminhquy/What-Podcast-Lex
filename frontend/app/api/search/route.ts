import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    console.log("Fetching from Flask API:", `http://localhost:5000/search?q=${encodeURIComponent(query)}`)
    const response = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(query)}`)
    console.log("Flask API response status:", response.status)

    const responseText = await response.text()
    console.log("Flask API response text:", responseText)

    if (!response.ok) {
      throw new Error(`Flask API response was not ok: ${response.status} ${response.statusText}`)
    }

    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError)
      throw new Error("Invalid JSON response from Flask API")
    }

    console.log("Flask API response data:", data)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching from Flask API:", error)
    return NextResponse.json({ error: "Internal Server Error", details: error}, { status: 500 })
  }
}

