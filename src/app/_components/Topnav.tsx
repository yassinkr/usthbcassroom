"use client"
import {  SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
export default function Topnav ({agent}:{agent:boolean}){
    const pathname = usePathname();
    return (
        <nav className="flex items-center justify-between w-full max-h-20 p-4 text-xl font-semibold  border-b-black">
            <div> ClassRoom</div>
            <div className="flex flex-row gap-4items-center"> 
                <SignedOut>
                    <SignInButton/>
                </SignedOut>
                <SignedIn >
                    <div className="flex justify-between gap-4">
                        {(!pathname.includes("addnews") && agent) &&<Button>
                            <Link href="/addnews">Add news</Link>
                        </Button>}
                 <UserButton/>
                    </div>
                </SignedIn>
            </div>
        </nav>
    )
}