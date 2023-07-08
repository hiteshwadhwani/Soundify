import { Song } from "@/types"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

const useLoadSongurl = (song: Song) => {
    const supabaseClient = useSupabaseClient()

    if(!song){
        return ''
    }

    const {data} = supabaseClient.storage.from('songs').getPublicUrl(song.song_path)
    return data.publicUrl
}
export default useLoadSongurl