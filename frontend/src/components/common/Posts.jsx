import PostSkeleton from "../skeletons/PostSkeleton.jsx";
import Post from "./Post.jsx";
import { POSTS } from '../../src/utils/db/dummy.js'

const Posts = () => {
    const isLoading = false;

    return (
        <>
            {isLoading && (
                <div className='flex flex-col justify-center'>
                    <PostSkeleton />
                    <PostSkeleton />
                    <PostSkeleton />
                </div>
            )}
            {!isLoading && POSTS?.length === 0 && <p className='text-center my-4'>Belum ada postingan nih awokawok. Ngepost dong👻</p>}
            {!isLoading && POSTS && (
                <div>
                    {POSTS.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}
                </div>
            )}
        </>
    );
};
export default Posts;