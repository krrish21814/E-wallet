"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import prisma from "../prisma"
import { Prisma } from "@prisma/client"

export const createOnRampTxn = async ({ amount, provider }:
    {
        amount: number,
        provider: string,
    }) => {

    const token = Math.random().toString();
    const session = await getServerSession(authOptions);
    const userId = session?.user.id

    if (!session || !session.user.id) {
        return { success: false, data: "User is not authenticated" };
    }
    if (amount <= 0) {
        return { success: false, data: "Enter valid amount" }
    }

    try {
        await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
            await tx.balance.update({
                where: {
                    userId: Number(userId)
                },
                data: {
                    locked: { increment: amount }
                }
            });
            await tx.onRampTransaction.create({
                data: {
                    userId: Number(userId),
                    amount,
                    status: "Processing",
                    startTime: new Date(),
                    provider,
                    token
                }
            });
        });
        return { success: true, data: "Balance Added" }
    } catch {
        return { success: false, data: "An error occurred. Please try again" }
    }
}