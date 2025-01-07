import Link from "next/link";
import { LandingTopBar } from "./components/LandingTopBar";

export default function Home() {
    return (
        <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-r from-[#6e05d2] to-[#8855ff]">

            <LandingTopBar />

            <div className="flex-1 px-12">
                <div className="flex h-full w-full">

                    <div className=" sm:w-2/4 ">
                        <div className="flex items-start justify-center h-full flex-col p-4 px-0 sm:px-10 pb-40">
                            <div className="text-5xl sm:text-7xl font-bold text-white ">
                                E-wallet
                            </div>
                            <div className="mt-5 font-thin text-white text-2xl">
                                Secure, seamless digital payments and effortless money management experience financial convenience with Paybit today!
                            </div>
                            <Link
                                className="bg-white hover:bg-gray-200 text-[#6e05d2] hover:scale-105 transition-transform duration-300 p-3 rounded-full w-40 text-xl flex justify-center mt-5 shadow-md"
                                href={"/signup"}>
                                Signup
                            </Link>
                        </div>
                    </div>

                    <div className="w-3/4 scale-0 sm:scale-100 pb-20">
                        <div className="h-full flex items-center justify-center">
                            <img
                                src="/images/landingPage.png"
                                alt="landing page img"
                                className="object-contain max-w-full h-auto px-4 hover:scale-105 transition-all duration-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}