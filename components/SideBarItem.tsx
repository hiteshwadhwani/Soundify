'use client'

import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

interface SideBarItemProps{
    icon : IconType
    label: string;
    active ?: boolean;
    href: string
}

const SideBarItem : React.FC<SideBarItemProps>= ({icon : Icon,label, active, href}) => {
    return (
        <Link href={href} className={`flex flex-row gap-x-4 items-center w-full text-md font-medium cursor-pointer hover:text-white text-neutral-400 py-1 ${active && 'text-white'}`}>
            <Icon size={26} />
            <p className="truncate w-100">{label}</p>
        </Link>
    )
}

export default SideBarItem