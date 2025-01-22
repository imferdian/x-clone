import {Link} from "react-router-dom";
import XSvg from "../svgs/F.jsx";
import {MdHomeFilled} from "react-icons/md";
import {IoNotifications} from "react-icons/io5";
import {FaUser} from "react-icons/fa";
import {BiLogOut} from "react-icons/bi";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";

const Sidebar = () => {
    const queryClient = useQueryClient();
    const {mutate: logout, isError, error} = useMutation({
        mutationFn: async () => {
            const res = await fetch('/api/auth/logout', {
                method: 'POST',
            })
            const data = await res.json();
            if(!res.ok) throw new Error(data.error || 'Something went wrong!');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['authUser']})
        },
        onError: () => {
            toast.error('Gagal logout awokaoakw!!')
        }
    })

    const { data: authUser } = useQuery({queryKey: ['authUser']})

    return (
        <div className='md:flex-[2_2_0] w-18 max-w-64'>
            <div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full md:pl-2 md:pt-2'>
                <Link to='/' className='flex justify-center md:justify-start'>
                    <XSvg className='w-14 rounded-full fill-white hover:bg-stone-900'/>
                </Link>
                <ul className='flex flex-col gap-3 mt-4'>
                    <li className='flex justify-center md:justify-start'>
                        <Link
                            to='/'
                            className='flex gap-4 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >
                            <MdHomeFilled className='w-7 h-7'/>
                            <span className='text-lg hidden md:block'>Beranda</span>
                        </Link>
                    </li>
                    <li className='flex justify-center md:justify-start'>
                        <Link
                            to='/notifications'
                            className='flex gap-5 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >
                            <IoNotifications className='w-6 h-6'/>
                            <span className='text-lg hidden md:block'>Notifikasi</span>
                        </Link>
                    </li>

                    <li className='flex justify-center md:justify-start'>
                        <Link
                            to={`/profile/${authUser?.username}`}
                            className='flex gap-5 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
                        >
                            <FaUser className='w-6 h-6'/>
                            <span className='text-lg hidden md:block'>Profil</span>
                        </Link>
                    </li>
                </ul>
                {authUser && (
                    <Link to={`profile/${authUser?.username}`}
                          className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full'>
                        <div className='avatar hidden md:inline-flex pt-1'>
                            <div className='w-8 rounded-full'>
                                <img alt='profile img' src={authUser?.profileImg || "/avatar-placeholder.png"}/>
                            </div>
                        </div>
                        <div className='flex justify-between items-center flex-1'>
                            <div className='hidden md:block'>
                                <p className='text-white font-bold text-sm w-24 truncate'>{authUser?.fullName}</p>
                                <p className='text-slate-500 text-sm'>@{authUser?.username}</p>
                            </div>
                            <BiLogOut className='w-5 h-5 cursor-pointer'
                                      onClick={(e) => {
                                          e.preventDefault()
                                          logout();
                                      }}/>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Sidebar;