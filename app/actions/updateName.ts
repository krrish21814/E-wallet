"use server"

import prisma from "../prisma";
import { user } from "./user";

export const updateName = async ({ name }: {
    name: string,
}) => {
    const userSession = await user()
    const userId = userSession?.user.id
    if (!name) {
        return { success: false, data: "Enter valid input" };
    }
    try {
        await prisma.user.update({
            where: { id: Number(userId) },
            data: { name: name }
        })
        return { success: true, data: "Name updated successfully" }
    } catch (error) {
        return { success: false, data: "Unexpected Error" }
    }

}