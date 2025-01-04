"use client"
import { useState } from "react"
import { TextInput } from "../ui/TextInput"
import { Card } from "./Card"
import { createOnRampTxn } from "../actions/createOnRampTxn";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com"
}];


export const AddMoneyCard = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || " ");
    const [amount, setAmount] = useState("");
    const [message, setmessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleSubmit = async () => {
        setLoading(true)
        const response = await createOnRampTxn({ amount: Number(amount) * 100, provider });
        if (!response.success) {
            setIsError(true);
            setmessage(response.data)
            setLoading(false)
            return
        } else if (response.success) {
            window.location.href = redirectUrl || "";
            setIsError(false);
            setLoading(false)
            setmessage(response.data)
            setAmount("")
        }
    }

    return (<div className="">
        <Card title="Add money">
            <TextInput label="Amount" value={amount} placeholder="Enter amount" type="number" input={(value) => {
                setAmount(value);
                
            }} />
            <div>
                <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
                onChange={(e) => {
                    const selectedBank = SUPPORTED_BANKS.find(x => x.name === e.target.value)
                    setmessage("")
                    setRedirectUrl(selectedBank?.redirectUrl || "")
                    setProvider(selectedBank?.name || "");
                }}>
                    {SUPPORTED_BANKS.map((bank) => (
                        <option value={bank.name} key={bank.name}>{bank.name}</option>
                    ))}
                </select>

            </div>
            <div  className="flex justify-center pt-4 relative">
            <button onClick={handleSubmit}   className={`relative bg-[#6a51a6] text-white hover:bg-[#4f3c7d] font-bold py-2 px-4 border border-blue-700 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
            {loading ? "Processing..." : "Add Money"} 
            </button> 
            </div>
            <div className="flex">
            {message && (
                <div className={`${isError ? "text-red-600" : "text-green-600"}  `}>
                    {message}
                </div>
            )}
            </div>
           
        </Card>
        </div> )
}