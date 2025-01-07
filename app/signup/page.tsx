"use client"

import { ChangeEvent, useState } from "react"
import { createUser } from "../actions/createUser";
import { useRouter } from "next/navigation";
import { userSchema } from "../utils/validation";
import { ZodError } from "zod";
import Link from "next/link";

interface FormData {
    name: string,
    phoneNumber: string,
    password: string,
    email: string
}

export default function Signup() {
    const router = useRouter();
    const [form, setForm] = useState<FormData>({ name: '', phoneNumber: '', password: '', email: '' });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        try {
            userSchema.parse(form)

            const response = await createUser(form);

            if (response.success) {
                router.push("/api/auth/signin")
            } else {
                const responseError = response.data || "Error occured bro"
                console.log("error=", responseError)
                setError(responseError as string)
            }
        } catch (error) {
            if (error instanceof ZodError) {
                setError(error.errors[0]?.message)
            } else if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("An unexpected error occurred")
            }
        }
        setLoading(false);
    }

    return <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row transform transition-all duration-500 hover:scale-105 hover:shadow-xl">

            <div className="w-full md:w-1/2 bg-gradient-to-r from-[#4f3c7d] to-[#6a51a6] text-white flex items-center justify-center p-6 md:p-10">
                <div className="text-lg md:text-xl font-semibold text-center leading-relaxed">
                    "An investment in knowledge pays the best interest." – Benjamin Franklin
                </div>
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-10">
                <div className="text-3xl font-bold mb-6 text-[#4f3c7d]">
                    Create an Account
                </div>
                {error &&
                    <div className="text-red-600 mb-4">
                        {error}
                    </div>}

                <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4f3c7d] focus:outline-none transition-all duration-300"
                            name="name"
                            type="text"
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) => {
                                handleChange(e)
                                setError("")
                            }} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4f3c7d] focus:outline-none transition-all duration-300"
                            name="email"
                            type="text"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) => {
                                handleChange(e)
                                setError("")
                            }} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phone
                        </label>
                        <input
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4f3c7d] focus:outline-none transition-all duration-300"
                            name="phoneNumber"
                            type="number"
                            pattern="[0-9]*"
                            placeholder="Phone number"
                            value={form.phoneNumber}
                            onChange={(e) => {
                                handleChange(e)
                                setError("")
                            }} />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            className="w-full px-4 py-2 border mt-1 border-gray-300 rounded-md focus:ring-2 focus:ring-[#4f3c7d] focus:outline-none transition-all duration-300"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={(e) => {
                                handleChange(e)
                                setError("")
                            }} />
                    </div>

                    <div className="text-center mt-4 flex justify-center items-center space-x-2">
                        <div>
                            Already have an account?
                        </div>
                        <Link href="/signin">
                            <div className="text-[#4f3c7d] font-medium cursor-pointer hover:underline">
                                Login
                            </div>
                        </Link>
                    </div>

                    <button
                        className="w-full bg-[#4f3c7d] hover:bg-[#6a51a6] text-white py-2 rounded-md shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        type="submit">
                        {loading ? "Signing up..." : "Sign Up"}
                    </button>
                </form>

            </div>
        </div>
    </div>


}