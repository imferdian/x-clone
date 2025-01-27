import {Link} from "react-router-dom";
import XSvg from "../svgs/F.jsx";
import {MdHomeFilled} from "react-icons/md";
import {IoNotifications} from "react-icons/io5";
import {FaUser} from "react-icons/fa";
import {BiLogOut} from "react-icons/bi";
import {useQuery} from "@tanstack/react-query";
import LinkSidebar from "./LinkSidebar.jsx";
import useLogout from "../../hooks/useLogout.jsx";

const Sidebar = () => {
    const { logout } = useLogout()

    const { data: authUser } = useQuery({queryKey: ['authUser']})

    return (
        <div className='flex flex-col md:flex-row z-20'>
            <div className='fixed bottom-0 left-0 w-full md:sticky md:top-0 md:h-screen md:w-64 md:pl-2 md:pt-2 bg-black rounded-t-xl md:rounded-none border-t md:border-none border-gray-700'>
                <div className='flex md:flex-col md:justify-between md:space-y-4 md:h-[90%]'>
                    <div className='flex justify-around w-full md:block'>
                        <Link to='/' className='justify-center hidden md:block md:justify-start'>
                            <XSvg className='w-14 rounded-full fill-white hover:bg-stone-900'/>
                        </Link>
                        <ul className='flex md:flex-col gap-3 md:mt-4 justify-around w-full py-2'>
                            <LinkSidebar to='/' name='Beranda' >
                                <MdHomeFilled className='w-7 h-7' />
                            </LinkSidebar>
                            <LinkSidebar to='/notifications' name='Notifikasi' >
                                <IoNotifications className='w-6 h-6'/>
                            </LinkSidebar>
                            <LinkSidebar to={`/profile/${authUser?.username}`} name='Profil' >
                                <FaUser className='w-6 h-6'/>
                            </LinkSidebar>
                        </ul>
                    </div>
                    {authUser && (
                        <Link to={`profile/${authUser?.username}`}
                              className=' mr-1 hidden md:flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] md:py-2 md:px-4 md:rounded-full'>
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
        </div>
    )
}

export default Sidebar;