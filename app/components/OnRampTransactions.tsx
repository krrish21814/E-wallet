import { getOnrampTxns } from "../actions/getOnrampTxns"
import { Card } from "./Card"

export const OnRampTransactions = async ({ scroll = false }: { scroll?: boolean }) => {
   const txns = await getOnrampTxns()

   if (txns.length < 1) {
      return <Card>
         <div className="text-center pb-8 pt-8">
            No Recent Transactions
         </div>
      </Card>
   }
   return <div>
      <Card hover={false} title="Bank Transactions">
         <div className={`${scroll ? "max-h-96" : "max-h-56"} overflow-y-auto`}>
            {txns.slice(-10).reverse().map((txn, index) => (
               <div className="grid grid-cols-3 p-2 " key={index}>

                  <div className="">
                     <div>
                        Recieved
                     </div>
                     <div className="text-slate-600 text-sm ">
                        {txn.startTime.toDateString()}
                     </div>
                  </div>

                  <div className={`flex justify-center ${txn.status === "Success"
                     ? "text-green-500"
                     : txn.status === "Failure"
                        ? "text-red-500"
                        : "text-black"
                     }`}>
                     {txn.status}
                  </div>

                  <div className="flex flex-col justify-center items-center mb-1 ">
                     Rs {txn.amount / 100}
                  </div>

               </div>
            ))}
         </div>
      </Card>
   </div>
}