'use client'

import React, { useMemo } from 'react'
import {usePathname} from 'next/navigation'
import {HiHome} from 'react-icons/hi'
import {BiSearch} from 'react-icons/bi'

import Box from "./Box"
import SideBarItem from './SideBarItem'

interface SidebarProps{
    children: React.ReactNode
}

const Sidebar : React.FC<SidebarProps> = ({children}) => {

    const pathName = usePathname()

    const routes = useMemo(() => {
        return [
            {
                icon : HiHome,
                label: 'Home', 
                active : pathName !== '/search',
                href : '/'
            },
            {   
                icon : BiSearch,
                label: 'Search',
                active : pathName === '/search',
                href : '/search'
            },
        ]
    }, [pathName])


    return (
        <div className='flex h-full'>
        <div className='hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2'>   
            <Box>
                <div className='flex flex-col gap-y-4 px-5 py-4'>
                    {routes.map(route => (
                        <SideBarItem key={route.label} {...route} />
                    ))}
                </div>
            </Box>
            <Box className='overflow-y-auto h-full'>
                <div>library</div>
            </Box>
        </div>
        <main className='h-full flex-1 overflow-y-auto py-2'>
                {children}
        </main>
        </div>
    )
}

export default Sidebar
