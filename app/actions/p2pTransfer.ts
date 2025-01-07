"use server"

import prisma from "../prisma";
import { user } from "./user"
import bcrypt from "bcrypt";

export const p2pTransfer = async (amount: number, password: string, to: string) => {
    try {
        const userInfo = await user();
        const from = userInfo?.user.id

        if (!to) {
            return { success: false, data: "Invalid inputs" }
        }
        const fromUser = await prisma.user.findUnique({
            where: {
                id: Number(from)
            }
        });
        const toUser = await prisma.user.findUnique({
            where: {
                phone: to,
            }
        });
        const fromBalance = await prisma.balance.findUnique({
            where: {
                userId: Number(from)
            }
        });

        if (!toUser) {
            return { success: false, data: "Recipient user not found." };
        }
        if (amount <= 0) {
            return { success: false, data: "Invalid amount" };
        }
        if (Number(from) === toUser.id) {
            return { success: false, data: "Cannot send money to your own account." };
        }
        if (!fromBalance || fromBalance.amount < amount) {
            return { success: false, data: "Insufficient Balance" };
        }

        const isPasswordValid = fromUser?.password ? await bcrypt.compare(password, fromUser.password) : false

        if (!isPasswordValid) {
            return { success: false, data: "Incorrect password" };
        }

        await prisma.$transaction(async (tx) => {
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

            await tx.balance.update({
                where: { userId: Number(from) },
                data: { amount: { decrement: amount } }
            });
            await tx.balance.update({
                where: { userId: toUser.id },
                data: { amount: { increment: amount } }
            });

            await tx.p2pTransfer.create({
                data: {
                    fromUserId: Number(from),
                    toUserId: toUser.id,
                    amount,
                    timestamp: new Date()
                }
            });
        })
        return { success: true, data: "Transfer successfull" };
    } catch (error) {
        return { success: false, data: "An unexpected error occurred" }
    }
}