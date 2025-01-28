import {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";

import Posts from "../../components/common/Posts";
import ProfileHeaderSkeleton from "../../components/skeletons/ProfileHeaderSkeleton";
import EditProfileModal from "./EditProfileModal";

import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import {BiLogOut} from "react-icons/bi";
import useLogout from "../../hooks/useLogout.jsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {formatMemberSinceDate} from "../../src/utils/date/index.js";
import toast from "react-hot-toast";
import useFollow from "../../hooks/useFollow.jsx";
import LoadingDots from "../../components/common/loading/LoadingDots.jsx";

const ProfilePage = () => {
    const [coverImg, setCoverImg] = useState(null);
    const [profileImg, setProfileImg] = useState(null);
    const [feedType, setFeedType] = useState("posts");

    const { logout } = useLogout();

    const coverImgRef = useRef(null);
    const profileImgRef = useRef(null);

    const {username} = useParams();

    const queryClient = useQueryClient()

    const {follow, isPending} = useFollow()

    const {data: authUser} = useQuery({queryKey: ['authUser']})


    const { data, isLoading, isRefetching, refetch, isError} = useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => {
            try {
                const res = await fetch(`/api/users/profile/${username}`);
                const data = await res.json();
                if (!res.ok) {
                    console.error("API Error:", await res.text());
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
    });

    const handleImgChange = (e, state) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                state === "coverImg" && setCoverImg(reader.result);
                state === "profileImg" && setProfileImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const { mutate: updateProfile, isPending: isUpdatingProfile } = useMutation({
        mutationFn: async () => {
            const res = await fetch(`/api/users/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    coverImg,
                    profileImg,
                })
            });
            const data = await res.json()
            if(!res.ok) throw new Error(data.error || 'Something went wrong');
            return data;
        },
        onSuccess: () => {
            toast.success("Berhasil mengupdate profile");
            Promise.all([
                queryClient.invalidateQueries({queryKey: ['authUser']}),
                queryClient.invalidateQueries({queryKey: ['userProfile']}),
            ])
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    useEffect( () => {
        refetch()
    }, [username, refetch]);

    function handleFollowButton() {
        if(isPending) return;
        follow(user._id);
    }

    function handleUpdateProfileButton() {
        if(isUpdatingProfile) return;
        updateProfile();
    }

    // Handle loading state
    if (isLoading) {
        return (
            <ProfileHeaderSkeleton />
        )
    }
    const user = data?.user;
    console.log(user);

    const memberSinceDate = formatMemberSinceDate(user?.createdAt)
    const isMyProfile = authUser._id === user._id
    const amIFollowing = authUser?.following.includes(user?._id)

    // Handle error state
    if (isError) return <div>Error loading data</div>;

    // Handle case when data is undefined
    if (!data) return <div>No data found</div>;


    return (
        <>
            <div className='flex-[4_4_0] border-x border-gray-700 min-h-screen md:mb-0 mb-[52px] min-w-0'>
                {/* HEADER */}
                {(isLoading || isRefetching )&& <ProfileHeaderSkeleton />}
                {!isLoading && !isRefetching && !user && <p className='text-center text-lg mt-4'>User not found</p>}
                <div className='flex flex-col'>
                    {!isLoading && !isRefetching && user && (
                        <>
                            {/* Top Header */}
                            <div className='flex items-center'>
                                <div className=' flex gap-10 px-4 py-2 items-center'>
                                    <Link to='/'>
                                        <FaArrowLeft className='w-4 h-4' />
                                    </Link>
                                    <div className='flex flex-col'>
                                        <p className='font-bold text-lg'>{user?.fullName}</p>
                                        <span className='text-sm text-slate-500'>{data.postCount} posts</span>
                                    </div>
                                </div>
                                <div className='ml-auto mr-6 md:hidden'>
                                    <BiLogOut  className='w-5 h-5 cursor-pointer'
                                               onClick={(e) => {
                                                   e.preventDefault()
                                                   logout();
                                               }}/>
                                </div>
                            </div>
                            {/* End Top Header */}
                            {/* COVER IMG */}
                            <div className='relative group/cover'>
                                <img
                                    src={coverImg || user?.coverImg || "/cover.png"}
                                    className='h-52 w-full object-cover'
                                    alt='cover image'
                                />
                                {isMyProfile && (
                                    <div
                                        className='absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200'
                                        onClick={() => coverImgRef.current.click()}
                                    >
                                        <MdEdit className='w-5 h-5 text-white' />
                                    </div>
                                )}

                                <input
                                    type='file'
                                    hidden
                                    accept='image/*'
                                    ref={coverImgRef}
                                    onChange={(e) => handleImgChange(e, "coverImg")}
                                />
                                <input
                                    type='file'
                                    hidden
                                    accept='image/*'
                                    ref={profileImgRef}
                                    onChange={(e) => handleImgChange(e, "profileImg")}
                                />

                                {/* USER AVATAR */}
                                <div className='avatar absolute -bottom-12 md:-bottom-16 left-4 group'>
                                    <div className='w-28 md:w-32 relative '>
                                        <img alt='Profile Image' src={profileImg || user?.profileImg || "/avatar-placeholder.png"} className='rounded-full'/>
                                        {isMyProfile && (
                                            <div className='absolute bottom-1 md:bottom-3 right-0 p-1 bg-primary rounded-full group-hover:opacity-100 opacity-0 cursor-pointer z-[999]'>
                                                <MdEdit
                                                    className='w-4 h-4 text-white'
                                                    onClick={() => profileImgRef.current.click()}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className='flex justify-end px-4 mt-5'>
                                {isMyProfile && <EditProfileModal authUser={authUser} />}
                                {!isMyProfile && (
                                    <button className='btn btn-outline rounded-full btn-sm hover:bg-primary'
                                            onClick={handleFollowButton}>
                                        {isPending && (
                                            <LoadingDots/>
                                        )}
                                        {!isPending && amIFollowing && 'Unfollow'}
                                        {!isPending && !amIFollowing && 'Follow'}
                                    </button>
                                )}
                                {(coverImg || profileImg) && (
                                    <button
                                        className='btn btn-primary rounded-full btn-sm text-white px-4 ml-2'
                                        onClick={handleUpdateProfileButton}
                                    >
                                        {isUpdatingProfile ? <LoadingDots /> : 'Update' }
                                    </button>
                                )}
                            </div>

                            <div className='flex flex-col gap-4 mt-14 px-4'>
                                <div className='flex flex-col'>
                                    <span className='font-bold text-lg'>{user?.fullName}</span>
                                    <span className='text-sm text-slate-500'>@{user?.username}</span>
                                    <span className='text-sm my-1'>{user?.bio}</span>
                                </div>

                                <div className='flex gap-2 flex-wrap'>
                                    {user?.link && (
                                        <div className='flex gap-1 items-center '>
                                            <>
                                                <FaLink className='w-3 h-3 text-slate-500' />
                                                <a
                                                    href={`https://${user.link}`}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    className='text-sm text-blue-500 hover:underline'
                                                >
                                                    {user.link}
                                                </a>
                                            </>
                                        </div>
                                    )}
                                    <div className='flex gap-2 items-center'>
                                        <IoCalendarOutline className='w-4 h-4 text-slate-500' />
                                        <span className='text-sm text-slate-500'>{memberSinceDate}</span>
                                    </div>
                                </div>
                                <div className='flex gap-2'>
                                    <div className='flex gap-1 items-center'>
                                        <span className='font-bold text-sm'>{user?.following?.length}</span>
                                        <span className='text-slate-500 text-sm'>Following</span>
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <span className='font-bold text-sm'>{user?.followers?.length}</span>
                                        <span className='text-slate-500 text-sm'>Followers</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex w-full border-b border-gray-700 mt-4'>
                                <div
                                    className={` ${feedType === 'posts' ? '' : 'text-slate-500'} flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 relative cursor-pointer`}
                                    onClick={() => setFeedType("posts")}
                                >
                                    Posts
                                    {feedType === "posts" && (
                                        <div className='absolute bottom-0 w-10 h-1 rounded-full bg-primary' />
                                    )}
                                </div>
                                <div
                                    className={`${feedType === 'likes' ? '' : 'text-slate-500'} flex justify-center flex-1 p-3  hover:bg-secondary transition duration-300 relative cursor-pointer`}
                                    onClick={() => setFeedType("likes")}
                                >
                                    Likes
                                    {feedType === "likes" && (
                                        <div className='absolute bottom-0 w-10 h-1 rounded-full bg-primary' />
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    <Posts feedType={feedType} username={username} userId={user?._id} />
                </div>
            </div>
        </>
    );
};
export default ProfilePage;