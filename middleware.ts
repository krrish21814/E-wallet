import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";


export async  function middleware(req:NextRequest){
    // const token = await getToken({ req });
    // const { pathname } = req.nextUrl;

    // console.log("Token:", token); // Log the token for debugging
    // console.log("Requested Path:", pathname); // Log the requested path
    // if(pathname === "/"){
    //    return NextResponse.next();
    // }

    // if(token){
    //     if(pathname === "/signin" || pathname === "/signup"){
    //         return NextResponse.redirect(new URL("/dashboard", req.url));
    //     }
    // }else{
    //     if(pathname === "/dashboard"){
    //         return NextResponse.redirect(new URL("/signin",req.url))
    //     }
    // }
    return NextResponse.next();
}