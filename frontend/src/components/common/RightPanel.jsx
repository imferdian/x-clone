import RightPanelSkeleton from "../skeletons/RightPanelSkeleton.jsx";
import {Link} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";

const RightPanel = () => {
    const {data:suggestedUsers, isLoading} = useQuery({
        queryKey: ['suggestedUsers'],
        queryFn: async () => {
            try{
                const res = await fetch('api/users/suggested')
                const data = await res.json();

                if(!res.ok) throw new Error(data.error || 'Something went wrong');
                return data

            }catch (error) {

            }
        }
    })

    // if(suggestedUsers?.length === 0) return <div className='md:w-1/4 w-0'></div>

    return (
        <>
            <div className='hidden lg:block my-4 ml-6 w-1/4'>
                <div className='bg-[#16181C] px-4 py-3 rounded-xl sticky top-2 w-full'>
                    {suggestedUsers?.length === 0 ?
                        <p className='font-semibold pb-4 text-center'>Belum ada user yang bisa di follow</p> :
                        <p className='font-bold pb-4 text-xl'>Nih, di follow dong!!</p>
                    }
                    <div className='flex flex-col gap-4'>
                        {/*item*/}
                        {isLoading && (
                            <>
                                <RightPanelSkeleton/>
                                <RightPanelSkeleton/>
                                <RightPanelSkeleton/>
                                <RightPanelSkeleton/>
                            </>
                        )}
                        {!isLoading && (
                            suggestedUsers?.map((user) => (
                                <Link to={`/profile/${user.username}`} key={user._id} className='flex items-center justify-between gap-4'>
                                    <div className='flex gap-2 items-center'>
                                        <div className='avatar'>
                                            <div className='w-8 rounded-full'>
                                                <img alt='User Profile Img' src={user.profileImg || "/avatar-placeholder.png"}/>
                                            </div>
                                        </div>
                                        <div className='flex flex-col'>
										    <span className='font-semibold tracking-tight truncate w-28'> {user.fullName} </span>
                                            <span className='text-sm text-slate-500'>@{user.username}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <button className='btn bg-primary text-white hover:bg-primary/70 rounded-full btn-sm'
                                                onClick={(e) => e.preventDefault()}> Follow </button>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default RightPanel