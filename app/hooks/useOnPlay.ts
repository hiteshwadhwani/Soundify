import { use, useContext } from "react"
import useAuthModal from "./useAuth"
import usePlayer from "./usePlayer"
import { UserContext } from "./useUser"
import { Song } from "@/types"

const useOnPlay = (songs: Song[]) : (id: string) => void => {
    const player = usePlayer()
    const authModal = useAuthModal()

    const context = useContext(UserContext)
    const user = context?.user
    const subscription = context?.subscription

    const onPlay = (id: string) => {

        if(!user){
            return authModal.onOpen()
        }
    
        if(!subscription){
            // TODO : open subscrption modal
        }

        player.setId(id)
        player.setIds(songs.map((song) => song.id))
    }
    return onPlay
}
export default useOnPlay