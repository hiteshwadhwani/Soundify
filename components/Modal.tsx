'use client'

import * as Dialog from '@radix-ui/react-dialog'
import React from 'react';
import {IoMdClose} from 'react-icons/io'

interface ModalProps{
    title: string;
    onChange : (open : boolean) => void;
    isOpen : boolean;
    description: string;
    children:React.ReactNode
}

const Modal: React.FC<ModalProps> = ({
    title, description, isOpen, onChange, children
}) => {
    return (
        <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
            <Dialog.Portal>
                <Dialog.Overlay className='
                bg-neutral-900/90 backdrop-blur-sm fixed inset-0' />
                <Dialog.Content className="
                fixed
                drop-shadow-sm
                border
                border-neutral-700
                top-[50%]
                left-[50%]
                translate-x-[-50%]
                translate-y-[-50%]
                max-h-full
                h-full
                md:h-auto
                w-full
                md:w-[90VW]
                md:max-w-[450px]
                rounded-md
                bg-neutral-800
                p-[25px]
                focus:outline-none">
                <Dialog.Title className='text-xl text-center font-bold mb-4'>
                    {title}
                </Dialog.Title>
                <Dialog.Description className='text-center text-sm mb-5 leading-normal'>
                    {description}
                </Dialog.Description>
                <div>
                    {children}
                </div>
                <Dialog.Close asChild className='absolute top-[10px] right-[10px] text-neutral-500 hover:text-neutral-50 items-center inline-flex justify-center rounded-full focus:outline-none cursor-pointer'>
                    <IoMdClose />
                </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
export default Modal