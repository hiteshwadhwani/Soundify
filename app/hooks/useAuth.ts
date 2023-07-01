import {create} from 'zustand'

interface AuthStore{
    isOpen : boolean;
    onOpen : () => void
    onClose: () => void
}

const useAuthModal = create<AuthStore>((set) => ({
    isOpen : false,
    onOpen : () => set({isOpen: true}),
    onClose : () => set({isOpen: false})

}))

export default useAuthModal