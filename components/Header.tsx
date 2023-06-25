'use client'

import { twMerge } from "tailwind-merge";
import {RxCaretLeft, RxCaretRight} from 'react-icons/rx'
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import {HiHome} from 'react-icons/hi'
import { BiSearch } from "react-icons/bi";
import Button from "./Button"

interface HeaderProps{
    children: React.ReactNode;
    className ?: string
}

const Header : React.FC<HeaderProps> = ({children, className}) => {
    const router = useRouter()
    const onLogout = useCallback(() => {

    }, [])
    return (
        <div className={twMerge('bg-gradient-to-b from-emerald-800 p-6 h-fit', className)}>
            <div className="flex items-center justify-between mb-6 w-full">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button onClick={() => router.forward()} className="bg-black rounded-full flex items-center justify-between hover:opacity-80 transition"><RxCaretLeft className="text-white" size={35} /></button>
                    <button onClick={() => router.back()} className="bg-black rounded-full flex items-center justify-between hover:opacity-80 transition"><RxCaretRight className="text-white" size={35} /></button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button className="bg-white rounded-full flex items-center justify-center hover:opacity-75 transition p-2"> <HiHome className="text-black" size={20} /></button>
                    <button className="bg-white rounded-full flex items-center justify-center hover:opacity-75 transition p-2"> <BiSearch className="text-black" size={20} /></button>
                   
                </div>
                <div className="flex justify-center items-center gap-x-4">
                    <div>
                        <Button className="bg-transparent text-neutral-300 font-medium">
                            SignUp
                        </Button>
                        <Button className="bg-white font-medium px-6 py-2">
                            Login
                        </Button>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}   

export default Header