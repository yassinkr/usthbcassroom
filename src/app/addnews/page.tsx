import React from 'react'
import FormAddNews from '~/components/FormAddNews';
import { createpublicationdata, Pub } from '~/server/db/queries';
const page = () => {
    const handleInsert =async ({Title,Description,Link}:{
      Title: string;
      Description: string;
      Link?: string | undefined;
    })=>{
        "use server";
      const created= await  createpublicationdata({Title,Description,Link});
      if(!created) return;
      return created.title;
    }
  return (
    <section className='w-full min-h-screen flex justify-center items-center'>
        <FormAddNews createpublication={handleInsert}/>
    </section>
  )
}

export default page