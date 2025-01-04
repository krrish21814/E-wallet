import Link from "next/link"
import { user } from "../actions/user"
import { Avatar } from "./Avatar"

export const AppBar = async () => {
    const userInfo = await user()
    const name = userInfo?.user?.name
    return <div className="flex justify-between items-center px-8 border-2 p-3">
        <Link
        className="text-3xl p-2 font-semibold text-[#6a51a6] hover:text-[#4f3c7d]"
        href={"/dashboard"}>
            Paybit
        </Link>
        <div>
            <Avatar name={name || "Anonymus"}/>
        </div>
    </div>
}