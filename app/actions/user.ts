"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"

export const user = async () => {

    const user = await getServerSession(authOptions);

    return user
}