import Link from "next/link";
import { Card } from "@/app/components/Card";
import { user } from "@/app/actions/user";
import { BalanceCard } from "@/app/components/BalanceCard";
import { OnRampTransactions } from "@/app/components/OnRampTransactions";
import prisma from "@/prisma";

export default async function dashboard() {
    const userSession = await user();

    const userInfo = await prisma.user.findUnique({
        where: { id: Number(userSession?.user.id) },
    });
    const userName = userInfo?.name || "Unknown";

    return (
        <div className="w-full px-4 -mt-14 sm:-mt-32">
            <div className="text-3xl sm:text-4xl text-[#6a51a6] pt-28 mb-8 font-bold">
                Home
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <Card>
                        <div className="p-4">
                            <div className="text-2xl font-bold text-[#6a51a6]">
                                Welcome {userName.charAt(0).toUpperCase() + userName.slice(1)}
                            </div>
                            <div className="text-slate-600 mt-2 text-sm sm:text-base font-medium">
                                Your all-in-one digital wallet for secure and hassle-free transactions.
                            </div>
                        </div>
                        <div className="mt-6 px-3 pb-3">
                            <div className="flex flex-col space-y-6">
                                <div>
                                    <div className="mb-2 text-sm text-slate-600">
                                        Quickly add funds to your Paybit wallet for hassle-free transactions.
                                    </div>
                                    <Link href="/transfer" passHref>
                                        <button className="block w-full bg-[#6a51a6] hover:bg-[#4f3c7d] text-white text-center py-2 px-4 rounded-lg font-bold">
                                            Add Money
                                        </button>
                                    </Link>
                                </div>

                                <div>
                                    <div className="mb-2 text-sm text-slate-600">
                                        Send money to friends and family securely and instantly.
                                    </div>
                                    <Link href="/p2p" passHref>
                                        <button className="block w-full bg-[#4f3c7d] hover:bg-[#6a51a6] text-white text-center py-2 px-4 rounded-lg font-bold">
                                            Transfer Funds
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <Card>
                    <div className="mb-4">
                        <BalanceCard />
                    </div>
                    <div>
                        <OnRampTransactions />
                    </div>
                </Card>
            </div>
        </div>
    );
}
