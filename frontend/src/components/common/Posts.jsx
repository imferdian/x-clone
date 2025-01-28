import PostSkeleton from "../skeletons/PostSkeleton.jsx";
import Post from "./Post.jsx";
import {useQuery} from "@tanstack/react-query";
import {useEffect} from "react";

const Posts = ({ feedType, username, userId }) => {

    const getPostEndPoint = () => {
        switch (feedType) {
            case 'forYou':
                return '/api/posts/all';
            case 'following':
                return '/api/posts/following';
            case 'posts':
                return `/api/posts/user/${username}`;
            case 'likes':
                return `/api/posts/likes/${userId}`;
            default:
                return '/api/posts/all';
        }
    }

    const POST_ENDPOINT = getPostEndPoint()

    const {data: posts, isLoading, refetch, isRefetching} = useQuery({
        queryKey: ['posts'],
        queryFn: async () => {
            try {
                const res = await fetch(POST_ENDPOINT);
                const data = await res.json();

                if(!res.ok) throw new Error(data.error || 'Something went wrong');
                return data;
            }catch (error) {
                throw error;
            }
        }
    })

    useEffect(() => {
        refetch();
    }, [feedType, refetch, username])



    return (
        <>
            {(isLoading || isRefetching) && (
                <div className='flex flex-col justify-center'>
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                </div>
            )}
            {!isLoading && !isRefetching && posts?.length === 0 && feedType === 'forYou' && <p className='text-center my-4'>Belum ada postingan nih awokawok. Ngepost dong👻</p>}
            {!isLoading && !isRefetching && posts?.length === 0 && feedType === 'following' && <p className='text-center my-4'>Following kamu belum ada yang ngepost, nih😪</p>}
            {!isLoading && !isRefetching && posts?.length === 0 && feedType === 'posts' && <p className='text-center my-4'>Belum ada postingan, nih🙄</p>}
            {!isLoading && !isRefetching && posts?.length === 0 && feedType === 'likes' && <p className='text-center my-4'>Belum ada ngelike postingan, nih😒</p>}
            {!isLoading && !isRefetching && posts && (
                <div>
                    {posts.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}
                </div>
            )}
        </>
    );
};
export default Posts;