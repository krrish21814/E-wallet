"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const SideBarItem = ({ href, title, icon, isOpen }: {
    href: string;
    title: string;
    icon: React.ReactNode;
    isOpen: boolean;

}) => {
    const pathname = usePathname();
    const selected = pathname === href;

    return (
        <Link className={`flex items-center py-4 p-3 mr-3 -ml-1 rounded-lg transition-all duration-300 ${selected ? "bg-[#e0e7ff] scale-105" : "hover:bg-[#f3f4f6]"}`} href={href}>
            <div className={`${!isOpen ? "pl-0 sm:pl-3" : ""} transition-all duration-300 text-3xl ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
                {icon}
            </div>
            <div className={`${!isOpen? "scale-0" : "scale-100"} transition-all duration-300 font-bold ml-2 ${selected ? "text-[#6a51a6]" : "text-slate-500"}`}>
                {title}
            </div>
        </Link>
    );
};