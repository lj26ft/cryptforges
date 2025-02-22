import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const listings = await prisma.marketplaceListing.findMany({
      include: {
        nft: true,
        seller: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    })

    res.status(200).json(listings)
  } catch (error) {
    console.error("Error fetching marketplace listings:", error)
    res.status(500).json({ message: "Error fetching marketplace listings" })
  }
}

