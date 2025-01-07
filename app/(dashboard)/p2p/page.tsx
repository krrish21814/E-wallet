import { refresh } from "@/app/actions/refresh";
import { BalanceCard } from "@/app/components/BalanceCard";
import { Card } from "@/app/components/Card";
import { P2pTransfers } from "@/app/components/P2pTransfers";
import { SendCard } from "@/app/components/SendCard";

export default function p2pTransfer() {

  return (
    <div className="w-full p-4 -mt-12 sm:-mt-32">
      <div className="text-3xl sm:text-4xl text-[#6a51a6] pt-24 mb-8 font-bold">
        P2P Transfer
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 ">

        <div >
          <SendCard />
        </div>

        <Card>
          <div className="mb-2">
            <BalanceCard />
          </div>
          <div>
            <P2pTransfers />
          </div>
          <div>
            <button
              className="bg-[#6a51a6] text-white hover:bg-[#4f3c7d] font-bold py-2 px-4 mt-3 ml-1 border border-blue-700 rounded-lg "
              onClick={refresh}>Refresh</button>
          </div>
        </Card>

      </div>
    </div>
  );
}