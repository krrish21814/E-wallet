"use client"
import { SideBarItem } from "./SideBarItem";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { BiArrowBack, BiTransfer } from "react-icons/bi";
import { MdOutlineArrowOutward } from "react-icons/md";
import { MdOutlineAccessTime } from "react-icons/md";
import { useEffect, useState } from "react";

export const SideBar = () => {
    const [open, setOpen] = useState(true);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setOpen(false);
            } else {
                setOpen(true);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (<div className="relative border-r border-slate-300 ">
        <div className={`  ${open ? "w-96 sm:w-72" : "w-20 sm:w-28"} sticky top-0 left-0 bottom-0 pl-5 pt-28 transition-all duration-500`}>

            <div onClick={() => { setOpen(!open) }}
                className=" bg-[#6a51a6] flex justify-center items-center text-white w-8 h-8 rounded-full  absolute -right-4 top-9 border border-slate-300 cursor-pointer">
                <BiArrowBack className={`text-xl ${!open && "rotate-180"} transition-all duration-500`} />
            </div>


            <div className="text-xl -mt-10 sm:-mt-0">
                <SideBarItem href="/dashboard" isOpen={open} title="Dashboard" icon={<MdOutlineDashboard />} />
                <SideBarItem href="/transfer" isOpen={open} title="Transfer" icon={<MdOutlineArrowOutward />} />
                <SideBarItem href="/transactions" isOpen={open} title="Transactions" icon={<MdOutlineAccessTime />} />
                <SideBarItem href="/p2p" isOpen={open} title="P2P" icon={<BiTransfer />} />

            </div>

        </div>
    </div>
    )
}
