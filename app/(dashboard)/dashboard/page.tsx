"use client"

import { signOut, useSession } from "next-auth/react";

export default function dashboard(){
    const session = useSession();
    const user = session.data?.user?.name
    return<div>
{user}
        <button onClick={()=>signOut(

        )}>signout</button>

        <div className="pt-10">
           
        </div>
    </div>
}