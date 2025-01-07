"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import prisma from "../prisma"

export const getOnrampTxns = async () => {
    const session = await getServerSession(authOptions)
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user.id)
        }
    })
    return txns
}

