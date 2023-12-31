import { FaPlay } from "react-icons/fa"

const PlayButton = () => {
    return (
        <button className="
        transition
        opacity-0
        group-hover:opacity-100
        hover:scale-110
        rounded-full flex
        items-center
        justify-center bg-green-500
        p-4
        drop-shadow-md
        translate-y-1/4
        group-hover:translate-y-0">
            <FaPlay className="text-black" />
        </button>
    )
}

export default PlayButton