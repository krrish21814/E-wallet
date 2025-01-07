import { OnRampTransactions } from "@/app/components/OnRampTransactions";
import { P2pTransfers } from "@/app/components/P2pTransfers";

export default function transaction() {
    return (<div className="w-full -mt-12 sm:-mt-48 p-4">
        <div className="text-3xl sm:text-4xl text-[#6a51a6] pt-24 mb-8 font-bold">
            Transactions
        </div>
        <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 w-full">

            <OnRampTransactions scroll={true} />
            <P2pTransfers scroll={true} />
        </div>
    </div>
    )
}