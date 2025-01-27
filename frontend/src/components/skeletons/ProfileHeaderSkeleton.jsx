import {FaArrowLeft} from "react-icons/fa6";
import {Link} from "react-router-dom";

const ProfileHeaderSkeleton = () => {
    return (
        <div className='flex flex-col gap-2 w-full'>
            <div className='flex gap-2 items-center '>
                <div className='flex flex-1 gap-1'>
                    <div className='flex flex-col gap-1 w-full'>
                        <div className='flex gap-10 px-4 py-2 items-center'>
                            <Link to='/'>
                                <FaArrowLeft className='w-4 h-4' />
                            </Link>
                            <div className='flex flex-col gap-1'>
                                <div className='skeleton h-4 w-12 rounded-full'/>
                                <div className='skeleton h-4 w-16 rounded-full'/>
                            </div>
                        </div>
                        <div className='skeleton h-52 w-full relative '>
                            <div className='skeleton h-32 w-32 rounded-full border absolute -bottom-16 left-3'/>
                        </div>
                        <div className='skeleton h-8 mt-4 w-24 ml-auto rounded-full mr-4'/>
                        <div className='pl-4 space-y-6 flex flex-col'>
                            <div className='gap-2 flex flex-col'>
                                <div className='skeleton h-4 w-14 rounded-full mt-10'/>
                                <div className='skeleton h-4 w-20 rounded-full'/>
                                <div className='skeleton h-4 w-2/3 rounded-full'/>
                            </div>
                            <div className='flex gap-2 flex-wrap'>
                                <div className='skeleton h-4 w-40 rounded-full'/>
                                <div className='skeleton h-4 w-32 rounded-full'/>
                            </div>
                            <div className='flex gap-2'>
                                <div className='skeleton h-4 w-24 rounded-full'/>
                                <div className='skeleton h-4 w-24 rounded-full' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProfileHeaderSkeleton;