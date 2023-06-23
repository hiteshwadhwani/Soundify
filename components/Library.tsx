import {AiOutlinePlus} from 'react-icons/ai'
import {TbPlaylist} from 'react-icons/tb'

const Library = () => {
    const onClick = () => {
        // click to do something
    }
    return (
        <div className="flex flex-col gap-y-2 px-5 py-4">
            <div className="flex flex-row items-center justify-between">
                <div className='inline-flex items-center flex-row gap-x-2'>
                    <TbPlaylist size={26} className='text-neutral-400' />
                    <p className='text-neutral-400 text-md font-medium'>Your Library</p>
                </div>
                <AiOutlinePlus size={26} className='text-neutral-400 hover:text-white cursor-pointer transition' />
            </div>
            <div>
                songs
            </div>
        </div>
    )
}
export default Library