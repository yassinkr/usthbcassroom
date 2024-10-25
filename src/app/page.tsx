import { SignedIn, SignedOut } from "@clerk/nextjs";
import {getMypublication} from "../server/db/queries"
import Image from "next/image"
import Link from "next/link";
import { Button } from "~/components/ui/button";
export const dynamic= "force-dynamic"

async function  Images(){
     const images = await getMypublication();
  return( 
  <div className="w-[80%] flex justify-around items-start gap-4 flex-wrap p-4">
  {images.map((image,id)=>(
    <div key= {id} className="flex h-48 w-48 flex-col rounded-xl bg-slate-600">
      <Link href={`/pub/${image.id}`} className="max-w-full h-full ">
      <div className="max-w-full h-full flex justify-center items-center font-bold">
        <h1>{image.title}</h1>
      </div>
      </Link>
    </div>
  ))}
</div>

  )
}

export default async function HomePage() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-center  text-white px-5 ">
     <SignedOut>
      <div className="w-full h-full text-2xl text-center">
      sign in to see the Publications
      </div>
     </SignedOut>
     <SignedIn>
     <Images/>
     </SignedIn>
    </main>
  );
}
