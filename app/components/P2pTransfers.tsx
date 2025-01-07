import { getP2pTransfers } from "../actions/getP2pTransfers"
import { user } from "../actions/user"
import { Card } from "./Card"

type P2PTransfer = {
    fromUserName: string | null | undefined;
    toUserName: string | null | undefined;
    fromUserId: number;
    toUserId: number;
    time: Date;
    amount: number;
}


export const P2pTransfers = async ({ scroll = false }: { scroll?: boolean }) => {
    const transfers: P2PTransfer[] = await getP2pTransfers()
    const userInfo = await user();
    const currentUser = userInfo?.user.id;

    if (transfers.length < 1) {
        return <Card>
            <div className="text-center pb-8 pt-8">
                No Recent Transactions
            </div>
        </Card>
    }
    return <Card title="P2P Transactions" hover={false}>
        <div className={`${scroll ? "max-h-96" : "max-h-56"} overflow-y-auto`}>
            {transfers.slice(-10).reverse().map(t => {
                const fromUserName = t.fromUserName ? t.fromUserName.charAt(0).toUpperCase() + t.fromUserName.slice(1) : "Unknown Sender";
                const toUserName = t.toUserName ? t.toUserName.charAt(0).toUpperCase() + t.toUserName.slice(1) : "Unknown Receiver";
                return (
                    <div className="flex justify-between p-1" key={`${t.fromUserId}-${t.toUserId}-${t.time}`}>
                        <div className="py-1">
                            <div>
                                {fromUserName} to {toUserName}
                            </div>
                            <div className="text-slate-600 text-sm">
                                {t.time.toDateString()}
                            </div>
                        </div>
                        <div className="flex flex-col justify-center mr-2">
                            {t.fromUserId === Number(currentUser) ? (
                                <div className="text-red-500 w-20 sm:w-full">
                                    - Rs {t.amount / 100}
                                </div>
                            ) : (
                                <div className="text-green-500 w-20 sm:w-full">
                                    + Rs {t.amount / 100}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    </Card>

}