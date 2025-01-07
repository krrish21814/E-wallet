import Link from "next/link"

export const LandingTopBar = () => {
    return (
        <div className="px-6 sm:px-10 py-4">
            <div className="flex justify-between items-center">
                <div className="text-2xl sm:text-4xl p-2 font-bold text-white">Paybit</div>
                <Link href={"/signup"} className="bg-white scale-90 sm:scale-100 hover:bg-gray-200 text-[#6e05d2] hover:scale-105 transition-all duration-300  p-2 rounded-full w-32 flex justify-center text-lg">Get Started</Link>
            </div>
        </div>
    )
}

