"use server"

import prisma from "../prisma"
import bcrypt from "bcrypt"
export const createUser = async (
    data: {
        name: string,
        phoneNumber: string,
        password: string,
        email: string
    }
) => {
    const existingPhone = await prisma.user.findUnique({
        where: {
            phone: data.phoneNumber
        }
    })

    if (existingPhone) {
        return { success: false, data: "User already exist" }
    }

    const existingEmail = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    })

    if (existingEmail) {
        return { success: false, data: "Email already in use" }
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)
    try {
        await prisma.user.create({
            data: {
                phone: (data.phoneNumber),
                name: data.name,
                password: hashedPassword,
                email: data.email,
                Balance: {
                    create: {
                        amount: 0,
                        locked: 0
                    }
                }
            }
        })
    } catch (error) {
        return { success: false, data: error }
    }
    return { success: true, data: "success" }
}
