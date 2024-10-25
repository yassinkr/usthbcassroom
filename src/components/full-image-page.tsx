import { clerkClient } from "@clerk/nextjs/server";
import { deletepublication, getpublication} from "~/server/db/queries"
import { Button } from "./ui/button";
import Link from "next/link";



export default async function FullPageImageView(props :{id :number}){
      
    const image = await getpublication(props.id);
    if(!image.userId || !image.createdAt) return <div>Image not found</div>
    const uploaderInfo = await clerkClient.users.getUser(image.userId);
    return <div className=" h-full w-full flex justify-center items-center ">
    <div className="w-[50%] flex flex-col flex-shrink-0 border-l ">
        <div className="text-xl font-bold border-b text-center p-2"> <h1>{image.title}</h1></div>
        <div className="flex flex-col gap-3">
            <span> Description:</span>
            <span>{image.description}</span>
            <Button className="bg-white w-fit px-5 " ><Link href={image.url}>Link</Link></Button>
            <span> Uploaded By:</span>
            <span>{uploaderInfo.fullName}</span></div>
            <div className="flex flex-col p-2">
            <span> created on:</span>
            <span>{new Date(image.createdAt).toLocaleDateString()}</span></div>
            <div className="flex flex-col p-2">
            <form action={async ()=>{"use server";await deletepublication(image.id)}}>
                <Button type="submit" variant="destructive"> Delete</Button></form>
            </div>
    </div>
    </div>
    
}