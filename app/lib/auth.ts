import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, Session } from "next-auth";
import prisma from "@/app/prisma";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                phone: { label: "Number", placeholder: "Ph number", type: "number" },
                password: { label: "Password", placeholder: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.phone || !credentials.password) {
                    throw new Error("Enter valid inputs");
                }
                try {
                    const existingUser = await prisma.user.findUnique({
                        where: { phone: (credentials.phone) }
                    });
                    if (!existingUser) {
                        throw new Error("User not found");
                    }
                    const validPassword = await bcrypt.compare(credentials.password, existingUser.password);

                    if (!validPassword) {
                        throw new Error("Incorrect password");
                    }
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        number: existingUser.phone
                    }
                } catch (error) {
                    if (error instanceof Prisma.PrismaClientKnownRequestError) {
                        throw new Error("Database error occurred. Please try again.")
                    } else {
                        throw error;
                    }
                }
            }
        })],
    secret: process.env.NEXTAUTH_SECRET || "secret",
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            session.user.id = token.sub as string;
            return session;
        }
    },
    pages: {
        signIn: "/signin"
    }
}