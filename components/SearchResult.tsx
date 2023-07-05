'use client'

import { Song } from "@/types"
import React from "react"
import MediaItem from "./MediaItem"
import LikeButton from "./LikeButton"

interface SearchResultProps{
    songs: Song[]
}
const SearchResult: React.FC<SearchResultProps> = ({songs}) => {
    return (
        <div>
            {songs.map((item) => (
                <div key={item.id} className="flex items-center gap-x-4 w-full">
                    <MediaItem data={item} />
                    <LikeButton songId={item.id} />
                </div>
                
            ))}
        </div>
    )
}
export default SearchResult