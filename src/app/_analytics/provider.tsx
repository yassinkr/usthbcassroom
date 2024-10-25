// app/providers.js
'use client'
import { useAuth, useUser } from '@clerk/nextjs'
import { userInfo } from 'os'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import React, { useEffect } from 'react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, 
    {
        api_host: "/ingest",
        ui_host: 'https://us.posthog.com'
      } ) }

export function CSPostHogProvider({ children }:{children: React.ReactNode}) {
    return <PostHogProvider client={posthog}>
        <PostHogAuthWrapper>{children}</PostHogAuthWrapper></PostHogProvider>
}

function PostHogAuthWrapper ({children}:{children : React.ReactNode}){
    const auth = useAuth();
    const userInfo = useUser();
    useEffect(()=>{
        if(userInfo.user){
            posthog.identify(userInfo.user.id,{
                email: userInfo.user.emailAddresses[0]?.emailAddress,
                username: userInfo.user.fullName,
            });
        }
        else {if(!auth.isSignedIn){ 
            posthog.reset();}
           
        }
    },[auth,userInfo]);
    return children;
}