import Link from "next/link"

export const LandingTopBar = () => {
    return (
        <div className="px-4 py-4 ">
            <div className="flex justify-between items-center">
                <div className="text-4xl p-2 font-bold text-[#6e05d2]">Paybit</div>
                <Link href={"/signup"} className="bg-[#6e05d2] hover:bg-[#8855ff] hover:scale-105 transition-all duration-300 text-white p-2 rounded-full w-32 flex justify-center text-lg">Get Started</Link>
            </div>
        </div>
    )
}