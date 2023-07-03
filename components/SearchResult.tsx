'use client'

import { Song } from "@/types"
import React from "react"
import MediaItem from "./MediaItem"

interface SearchResultProps{
    songs: Song[]
}
const SearchResult: React.FC<SearchResultProps> = ({songs}) => {
    return (
        <div>
            {songs.map((item) => (
                <MediaItem data={item} key={item.id} />
            ))}
        </div>
    )
}
export default SearchResult