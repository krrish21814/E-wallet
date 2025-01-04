import { user } from "../actions/user"
import prisma from "../prisma"
import { Card } from "./Card"

export const BalanceCard =async () => {
    const userdetails = await user()
    const balance = await prisma.balance.findUnique({
        where:{
            userId: Number(userdetails?.user.id)
        }
    })
    const lockedBalance = balance?.locked || 0; 
    const amountBalance = balance?.amount || 0; 
    const totalBalance = lockedBalance + amountBalance;
    return <Card hover={false} title="Balance">
    <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>
            Unlocked Balance
        </div>
        <div>
            {amountBalance/100} INR
        </div>
    </div>
    <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>
            Total Locked Balance
        </div>
        <div>
            {lockedBalance/100} INR
        </div>
    </div>
    <div  className="flex justify-between border-b border-slate-300 pb-2">
        <div>
            Total Balance
        </div>
        <div>
            {totalBalance / 100} INR
        </div>
    </div>
</Card>
}