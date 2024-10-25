"use client";
import { type ElementRef ,useEffect,useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal ({children}:{children :React.ReactNode}){
    const router = useRouter();
    const dialogRef = useRef<ElementRef<"dialog">>(null);
    useEffect(()=>{
        if(!dialogRef.current?.open){
            dialogRef.current?.showModal();
        }
    },[]);
    function onDismiss(){
        router.back();
    }
    return createPortal(
       
            <dialog ref={dialogRef} onClose={onDismiss} className="w-screen h-screen bg-black/90 m-0 text-white">
                {children}
            </dialog>
        ,
        document.getElementById("modal-root")!
 
    );
}