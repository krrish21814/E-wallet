import Link from "next/link";
import { AppBar } from "../components/AppBar";
import { SideBarItem } from "../components/SideBarItem";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { BiTransfer } from "react-icons/bi";
import { MdOutlineArrowOutward } from "react-icons/md";
import { MdOutlineAccessTime } from "react-icons/md";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <AppBar/>
       
        <div className="flex">
            <div className="w-72 border-r border-slate-300 min-h-screen pl-5 pt-28">
                <div className="text-xl">
                <SideBarItem href="/dashboard" title="Dashboard" icon={<MdOutlineDashboard/>}/>
                <SideBarItem href="/transfer" title="Transfer" icon={<MdOutlineArrowOutward/>}/>
                <SideBarItem href="/transactions" title="Transactions" icon={<MdOutlineAccessTime/>}/>
                <SideBarItem href="/p2p" title="P2P" icon={<BiTransfer/>}/>
                </div>
            </div>
            <div className="flex-1 overflow-x-hidden flex justify-center items-center px-4">
            {children}
            
        </div>
            </div>
            </div>
  );
}