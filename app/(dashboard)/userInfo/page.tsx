import { UserInfoCard } from "@/app/components/UserInfoCard";
import { UserUpdateCard } from "@/app/components/UserUpdateCard";

export default async function Page() {

    return <div className="w-screen h-screen -mt-8 sm:-mt-20 px-6">
        <div className="text-4xl text-[#6a51a6] pt-24 mb-8 font-bold">
            User
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4 ">
            <div>
                <UserUpdateCard />
            </div>
            <div className=" w-full max-w-sm mt-5 ml-0 sm:ml-5 scale-110">
                <UserInfoCard />
            </div>
        </div>
    </div>
}

