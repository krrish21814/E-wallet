import { z } from "zod";

export const userSchema = z.object({
    name:z.string().min(1,{message: "Name is required"}),
    phoneNumber: z.string()
    .regex(/^\d{10}$/,{message:"Phone number must be a valid 10-digit number"}),
    password: z.string().min(6, {message: "Password must be at least 6 characters long"}),
    email: z.string().email({message:"Enter valid email"})
})