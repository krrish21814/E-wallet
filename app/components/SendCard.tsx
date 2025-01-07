"use client"
import { useState } from "react"
import { TextInput } from "../ui/TextInput"
import { Card } from "./Card"
import { p2pTransfer } from "../actions/p2pTransfer"

export const SendCard = () => {
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    async function handleSubmit() {
        setLoading(true);
        try {
            const response = await p2pTransfer(Number(amount) * 100, password, phone);
            if (!response.success) {
                setIsError(true);
                setPassword("");
                setMessage(response.data);
            } else {
                setIsError(false);
                setMessage(response.data);
                setPhone("");
                setPassword("");
                setAmount("");
            }
        } catch (error) {
            setIsError(true);
            setMessage("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (<div >
        <Card title="Send">
            <TextInput
                label="Recipient Number"
                placeholder="Enter phone number"
                value={phone}
                type="number"
                input={(value) => {
                    setPhone(value)
                    setMessage("")
                }}
            />
            <TextInput
                label="Amount"
                placeholder="Enter amount"
                value={amount}
                type="number"
                input={(value) => {
                    setAmount(value)
                    setMessage("")
                }}
            />
            <TextInput
                label="Password"
                placeholder="Enter password"
                value={password}
                type="password"
                input={(value) => {
                    setPassword(value)
                    setMessage("")
                }}
            />
            <div className="flex justify-center pt-4 relative">
                <button onClick={handleSubmit} className={`relative bg-[#6a51a6] text-white hover:bg-[#4f3c7d] font-bold py-2 px-4 border border-blue-700 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                    {loading ? "Processing..." : "Send Money"}
                </button>
            </div>

            <div>
                {message && (<div className={`${isError ? "text-red-600" : "text-green-600"}`}>
                    {message}
                </div>)}
            </div>
        </Card>
    </div>
    )
}