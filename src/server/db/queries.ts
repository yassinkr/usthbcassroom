import "server-only"
import {db} from "~/server/db/index"
import {auth} from "@clerk/nextjs/server"
import { publication } from "./schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import analyticsServerClient from "../analytics";
export type Pub = typeof publication.$inferInsert;

export async function getMypublication(){
    const user = auth();
    if(!user.userId) throw new Error("unauthorized")

    const publication = await db.query.publication.findMany({
        where:(model,{eq})=>eq(model.userId,user.userId),
        orderBy:(model,{desc})=>desc(model.id),
      });
      return publication;
}
export async function deletepublication(id:number){
  const user=auth();
  if (!user.userId) throw new Error("Unauthorized");
  
  await db.delete(publication).where(and(eq(publication.id,id),eq(publication.userId,user.userId)));
  analyticsServerClient.capture({
    distinctId:user.userId,
    event:"delete publication",
    properties:{
    publicationId: id,
    }, 
  })
  redirect("/");
}

export async function createpublicationdata ({Title,Description,Link}:{
  Title: string;
  Description: string;
  Link?: string | undefined;
}){
    const user = auth();
    if(!user.userId) throw new Error("unauthorized");
    
    const pub:Pub = {
        title:Title,
        description:Description,
        url:Link ? Link :"no link",
        userId:user.userId,
    } 
    const publicated = await db.insert(publication).values(pub).execute();
    if(publicated) return pub;
    return;
}
export async function getpublication(id : number){
     const user =auth();
     if(!user) throw new Error ("unauthorized");
     const publication = await db.query.publication.findFirst(
      {where:(model,{eq})=>eq(model.id,id),}
     );
     if(!publication) throw new Error("publication not found");
     return publication;
}