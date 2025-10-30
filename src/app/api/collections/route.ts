import { NextRequest, NextResponse } from "next/server"
import { initialize as initializeProductModule } from "@medusajs/product"
import { notFound } from "next/navigation"

/**
 * This endpoint uses the serverless Product Module to list and count all product collections.
 * The module connects directly to your Medusa database to retrieve and manipulate data, without the need for a dedicated server.
 * Read more about the Product Module here: https://docs.medusajs.com/modules/products/serverless-module
 */
export async function GET(request: NextRequest) {
  // Skip database operations during build
  if (process.env.NODE_ENV === "production" && !process.env.POSTGRES_URL) {
    return Response.json({ error: "Database not configured" }, { status: 503 })
  }

  const productService = await initializeProductModule()

  const { offset, limit } = Object.fromEntries(request.nextUrl.searchParams)

  const [collections, count] = await productService
    .listAndCountCollections(
      {},
      {
        skip: parseInt(offset) || 0,
        take: parseInt(limit) || 100,
      }
    )
    .catch((e) => {
      return notFound()
    })

  return NextResponse.json({
    collections,
    count,
  })
}
export const dynamic = "force-dynamic"
