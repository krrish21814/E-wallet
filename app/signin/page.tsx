"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react"

export default function Signin() {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        setLoading(true)
        event.preventDefault();
        try {
            const result = await signIn("credentials", {
                phone,
                password,
                redirect: false,
            })

            if (result?.error) {
                setError(result.error)

                if (result.error === "Incorrect password") {
                    setLoading(false)
                    setPassword("")
                    return
                }
                setLoading(false)
                setPhone("")
                setPassword("")
            } else {
                router.push("/dashboard");
                setLoading(false)
            }
        } catch (error) {
            setLoading(false);
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return <div className="min-h-screen bg-gradient-to-r from-[#2f1f48] to-[#6a51a6] flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-96 transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
            <div className="text-4xl font-semibold text-[#4f3c7d] mb-6 text-center">
                Sign In
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-[#4f3c7d] font-semibold mb-2">
                        Phone Number
                    </label>
                    <input
                        className="w-full px-4 py-2 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6a51a6] transition-all duration-300"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value)
                        }}
                        type="number"
                        placeholder="Enter phone number" />
                </div>
                <div className="mb-6">
                    <label className="block text-[#4f3c7d] font-semibold mb-2">
                        Password
                    </label>
                    <input
                        className="w-full px-4 py-2 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6a51a6] transition-all duration-300"
                        value={password}
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        placeholder="Enter password" />
                </div>

                {error &&
                    <div className="text-red-500 mb-4 text-sm">
                        {error}
                    </div>}

                <button
                    className={`w-full bg-[#4f3c7d] text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-300 hover:bg-[#6a51a6] ${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-lg"}`}
                    type="submit">
                    {loading ? "processing" : "Submit"}
                </button>

            </form>
            <div className="mt-4 text-center">
                <div className="text-[#4f3c7d]">
                    Don't have an account?{" "}
                    <Link href="/signup" className="text-[#6a51a6] font-semibold hover:underline transition-all duration-300">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    </div>

}