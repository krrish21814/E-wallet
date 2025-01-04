import { AddMoneyCard } from "@/app/components/AddMoneyCard";
import { BalanceCard } from "@/app/components/BalanceCard";
import { Card } from "@/app/components/Card";



export default function transfer(){
    return <div className="w-screen -mt-60">
             <div className="text-4xl text-[#6a51a6] pt-24 mb-8 font-bold">
              Transfer
             </div>

             <div className="grid grid-cols-1 gap-5 md:grid-cols-2 p-4">
              
              <div className="mb-40 ">
                <AddMoneyCard/>
              </div>

             <Card>
              <BalanceCard/>
             </Card>
              
             </div>
            </div>

}