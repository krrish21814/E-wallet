import Link from "next/link"
import { user } from "../actions/user"
import { Avatar } from "./Avatar"
import prisma from "../../prisma";

export const AppBar = async () => {

    const userSession = await user();

    const userInfo = await prisma.user.findUnique({
        where: { id: Number(userSession?.user.id) }
    })
    const name = userInfo?.name
    return <div className="flex justify-between bg-white items-center px-4 sm:px-8 border-2  p-3">
        <Link
            className="text-2xl sm:text-3xl p-2 font-semibold text-[#6a51a6] hover:text-[#4f3c7d]"
            href={"/dashboard"}>
            Paybit
        </Link>
        <div>
            <Avatar name={name || "Unknown"} />
        </div>
    </div>
}