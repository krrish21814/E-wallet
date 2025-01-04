"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineDashboard, MdOutlineArrowOutward, MdOutlineAccessTime } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";

export const SideBarItem = ({ href, title, icon }: { href: string; title: string; icon: any }) => {
    const pathname = usePathname();
    const selected = pathname === href;

    return (
        <Link className={`flex items-center p-3 mr-3 -ml-1 rounded-lg transition-all duration-300 ${selected ? "bg-[#e0e7ff] scale-105" : "hover:bg-[#f3f4f6]"}`} href={href}>
            <div className={`text-3xl ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
                {icon}
            </div>
            <div className={`font-bold ml-2 ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
                {title}
            </div>
        </Link>
    );
};