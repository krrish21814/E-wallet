import Link from "next/link";
import { LandingTopBar } from "./components/LandingTopBar";

export default function Home() {
  return (

    <div className="h-screen flex flex-col overflow-hidden">

      <LandingTopBar />

      <div className="flex-1">
        <div className="flex h-full">

          <div className="w-2/4">
            <div className="flex items-start justify-center h-full flex-col p-4 px-10 pb-40">
              <div className="text-7xl font-bold">
                E-wallet
              </div>
              <div className="mt-5 font-thin text-2xl">
                Secure, seamless digital payments and effortless money management experience financial convenience with Paybit today!
              </div>
              <Link
                className="bg-[#6e05d2] hover:bg-[#8855ff] hover:scale-105 transition-all duration-300  text-white p-2 rounded-full w-40 text-xl flex justify-center mt-5"
                href={"/signup"}
              >
                Signup
              </Link>
            </div>
          </div>


          <div className="w-3/4 pb-20">
            <div className="h-full flex items-center justify-center">
              <img
                src="/images/final.png"
                alt="landing page img"
                className="object-contain max-w-full h-auto px-4 hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}