"use client"
import { useState } from "react"
import { TextInput } from "../ui/TextInput"
import { updateName } from "../actions/updateName";
import { updatePassword } from "../actions/updatePassword";
import { Card } from "./Card";

type FormState = {
    name: {
        value: string;
        isLoading: boolean;
        message: string;
        isError: boolean;
    };
    password: {
        current: string;
        new: string;
        isLoading: boolean;
        message: string;
        isError: boolean;
    };
}
export const UserUpdateCard = () => {
    const [formState, setFormState] = useState<FormState>({
        name: {
            value: "",
            isLoading: false,
            message: "",
            isError: false
        },
        password: {
            current: "",
            new: "",
            isLoading: false,
            message: "",
            isError: false
        }
    });

    const updateFormState = (
        section: keyof FormState,
        updates: Partial<FormState[typeof section]>
    ) => {
        setFormState(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                ...updates
            }
        }))
    }

    async function handleName() {
        updateFormState('name', { isLoading: true, message: "" });
        const response = await updateName({ name: formState.name.value });

        updateFormState('name', {
            isLoading: false,
            isError: !response.success,
            message: response.data,
            ...(response.success ? { value: "" } : "")
        });
    }

    async function handlePassword() {
        updateFormState('password', { isLoading: true, message: "" });
        const response = await updatePassword({
            newPassword: formState.password.new,
            currentPassword: formState.password.current
        });

        updateFormState('password', {
            isLoading: false,
            isError: !response.success,
            message: response.data,
            ...(response.success ? { current: "", new: "" } : {})
        });

    }
    return (
        <Card title="Update User Information">
            <div>
                <div className="w-full">
                    <TextInput
                        label="Update name"
                        type="text"
                        value={formState.name.value}
                        placeholder="Enter new name"
                        input={(value) => {
                            updateFormState('name', { value })
                        }}
                    />
                </div>

                <div className="flex mt-2">
                    <button
                        onClick={handleName}
                        className={`bg-[#6a51a6] hover:bg-[#4f3c7d] text-white flex justify-center py-2 px-4 w-20 h-10 rounded-lg font-semibold 
                      ${formState.name.isLoading ? "cursor-not-allowed" : ""} `}>
                        {formState.name.isLoading ? "Updating..." : "Update"}
                    </button>
                </div>

                <div className={`text-md mt-2 ${formState.name.isError ? "text-red-600" : "text-green-600"}`}>
                    {formState.name.message}
                </div>

                <div className="w-full">
                    <TextInput
                        label="Update password"
                        type="password"
                        value={formState.password.new}
                        placeholder="Enter new password"
                        input={(value) => {
                            updateFormState('password', { new: value })
                        }}
                    />
                    <TextInput
                        label="Existing password"
                        type="password"
                        value={formState.password.current}
                        placeholder="Enter existing password"
                        input={(value) => {
                            updateFormState('password', { current: value })
                        }}
                    />

                    <div className="flex mt-2 items-end">
                        <button
                            onClick={handlePassword}
                            className={`bg-[#6a51a6] hover:bg-[#4f3c7d] text-white flex justify-center py-2 px-4 w-20 h-10 rounded-lg font-semibold 
                      ${formState.password.isLoading ? "cursor-not-allowed" : ""} `}>
                            {formState.password.isLoading ? "Updating..." : "Update"}
                        </button>
                    </div>
                    <div className={`text-md mt-2 ${formState.password.isError ? "text-red-600" : "text-green-600"}`}>
                        {formState.password.message}
                    </div>
                </div>
            </div>
        </Card>)
}