"use server"
import bcrypt from "bcrypt"
import prisma from "../prisma";
import { user } from "./user"

export const updatePassword = async ({ currentPassword, newPassword }: {
    currentPassword: string, newPassword: string
}) => {
    try {
        const userSession = await user();
        const userId = userSession?.user.id;

        const userInfo = await prisma.user.findUnique({
            where: { id: Number(userId) }
        })
        if (!userInfo?.password) {
            return {
                success: false,
                data: "Cannot update password for this account"
            };
        }
        if (!currentPassword || !newPassword) {
            return { success: false, data: "Enter both fields" }
        }

        const isValid = await bcrypt.compare(currentPassword, userInfo?.password);
        console.log("pass", isValid)
        if (!isValid) {
            return { success: false, data: "Current password is incorrect" }
        }

        if (newPassword.length < 6) {
            return { success: false, data: "New Password must be at least 6 characters long" }
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await prisma.user.update({
            where: { id: Number(userId) },
            data: { password: hashedPassword }
        });

        return { success: true, data: "Pasword updated successfully" }
    } catch (error) {
        return {
            success: false,
            data: "Failed to update password. Please try again later."
        }
    }
}