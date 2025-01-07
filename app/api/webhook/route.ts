import prisma from "@/app/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
   const { userId, token, amount
   }: {
      userId: string; token: string; amount: number
   } = await request.json();

   try {
      await prisma.$transaction([
         prisma.balance.update({
            where: {
               userId: Number(userId),
            },
            data: {
               locked: { decrement: Number(amount) },
               amount: { increment: Number(amount) }
            }
         }),
         prisma.onRampTransaction.update({
            where: {
               token
            },
            data: {
               status: "Success"
            }
         }),

      ]);

      return NextResponse.json({ message: 'Captured' }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error: 'Error while processing transaction' }, { status: 400 });
   }
}