import { Song } from "@/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

const useGetSongById = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false)
    const {supabaseClient} = useSessionContext()
    const [song, setSong] = useState<Song | undefined>(undefined)
    
    useEffect(() => {
        if(!id){
            return;
        }

        setIsLoading(true)

        const fetchSong = async () => {
            const {data, error} = await supabaseClient.from('songs').select('*').eq('id', id).single()

            if(error){
                setIsLoading(false)
                return toast.error('something went wrong')
            }
            setSong(data as Song)
        }

        fetchSong()
    }, [id, supabaseClient])

    return useMemo(() => ({
        isLoading, song
    }), [isLoading, song])


}
export default useGetSongById