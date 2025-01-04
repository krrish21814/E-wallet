"use client";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { signOut } from "next-auth/react";

export const Avatar = ({ name }: { name: string }) => {
    const [info, setInfo] = useState(false);

    const UserInfo = () => (
        <div className="absolute mt-48 ml-6 rounded-lg p-4 w-18 h-15 bg-white shadow-lg">
            <div>
                <div className="font-light pb-2 -mt-2">
                    Hello, {name}
                </div>
                <button className="bg-[#927dcc] hover:bg-[#4f3c7d] mb-2 flex justify-center text-white font-bold py-1 w-full rounded-2xl">
                    User
                </button>
                <button onClick={() => signOut()} className="bg-[#927dcc] hover:bg-[#4f3c7d] text-white font-bold py-1 w-full rounded-2xl">
                    Logout
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex items-center">
            <div className="relative flex justify-center items-center text-white font-semibold text-lg w-10 h-10 bg-[#6a51a6] rounded-full">
                {name.charAt(0).toUpperCase()}
            </div>
            <div className="flex items-center px-3 text-xl">
                <div>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </div>
                <div onClick={() => setInfo(!info)} className="mt-1 px-1 cursor-pointer">
                    <IoIosArrowDown />
                </div>
            </div>
            {info && <UserInfo />}
        </div>
    );
};