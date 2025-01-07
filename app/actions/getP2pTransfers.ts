"use server"

import prisma from "../prisma";
import { user } from "./user"

export const getP2pTransfers = async () => {
    const userInfo = await user();
    const userId = userInfo?.user.id;

    const transfers = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(userId) },
                { toUserId: Number(userId) }

            ]
        },
    });

    const namedTransactions = await Promise.all(
        transfers.map(async (t) => {
            const fromUser = await prisma.user.findUnique({
                where: { id: t.fromUserId },
                select: { name: true }
            });
            const toUser = await prisma.user.findUnique({
                where: { id: t.toUserId },
                select: { name: true }
            });
            return {
                time: t.timestamp,
                amount: t.amount,
                fromUserId: t.fromUserId,
                toUserId: t.toUserId,
                fromUserName: fromUser?.name,
                toUserName: toUser?.name
            }
        })
    )
    return namedTransactions
}