'use client'

import { twMerge } from "tailwind-merge";
import {RxCaretLeft, RxCaretRight} from 'react-icons/rx'
import {FaUserAlt} from 'react-icons/fa'
import { useCallback, useContext } from "react";
import { useRouter } from "next/navigation";
import {HiHome} from 'react-icons/hi'
import { BiSearch } from "react-icons/bi";
import Button from "./Button"
import useAuthModal from "@/app/hooks/useAuth";
import {UserContext, useUser} from '@/app/hooks/useUser'
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { error } from "console";
import { toast } from "react-hot-toast";
import useUploadModal from "@/app/hooks/useUploadModal";

interface HeaderProps{
    children: React.ReactNode;
    className ?: string
}

const Header : React.FC<HeaderProps> = ({children, className}) => {
    const {onOpen}  = useAuthModal()
    const router = useRouter()
    const context = useContext(UserContext)
    const supabaseClient = useSupabaseClient()
    const onLogout = useCallback( async () => {
        const {error} = await supabaseClient.auth.signOut()
        
        // TODO : reset player

        router.refresh()
        if(error){
            toast.error(error.message)
        }
        else{
            toast.success('Logged out')
        }
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
                    {context?.user ? (
                        <div className="flex gap-x-4 items-center">
                            <Button className="
                                bg-white px-6 py-2
                            " onClick={onLogout}>
                                Logout
                            </Button>
                            <Button className="bg-white" onClick={() => router.push('/account')}>
                                <FaUserAlt />
                            </Button>
                        </div>

                    ) : (
                        <div>
                        <Button className="bg-transparent text-neutral-300 font-medium" onClick={onOpen}>
                            SignUp
                        </Button>
                        <Button className="bg-white font-medium px-6 py-2" onClick={onOpen}>
                            Login
                        </Button>
                    </div>

                    )}
                    
                </div>
            </div>
            {children}
        </div>
    )
}   

export default Header