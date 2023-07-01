'use client'


import { UserContext } from "@/app/hooks/useUser";
import React, { useContext } from "react"
import { twMerge } from "tailwind-merge";

interface BoxProps{
    children: React.ReactNode;
    className ?: string
}

const Box : React.FC<BoxProps> = ({children, className}) => {
    return (
        <div className={twMerge('bg-neutral-900 rounded-lg h-fit w-full', className)}>
            {children}
        </div>
    )
}
export default Box
