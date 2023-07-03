import { Song } from "@/types"
import React from "react"
import Image from "next/image"
import useLoadImage from "@/app/hooks/useLoadImage"

interface MediaItemProps{
    data: Song;
    onClick ?: (id: string) => void
}

const MediaItem: React.FC<MediaItemProps> = ({data, onClick}) => {
    const handleClick = () => {
        if(onClick){
            return onClick(data.id)
        }

        // TODO : Start player


    }
    const imagePath = useLoadImage(data)
    return (
        <div onClick={handleClick} className="flex flex-row gap-x-3 rounded-md items-center p-2 cursor-pointer w-full hover:bg-neutral-800/50">
            <div className="relative min-w-[48px] min-h-[48px] rounded-md overflow-hidden">
                <Image className="object-cover rounded-md" fill src={imagePath || '/images/liked.png'} alt="Image" />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">{data.title}</p>
                <p className="text-neutral-400 text-sm truncate">By {data.author}</p>
            </div>
        </div>
    )
}

export default MediaItem