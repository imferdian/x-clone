import { useState } from "react";
import CreatePost from "./CreatePost.jsx";
import Posts from "../../../components/common/Posts.jsx";

const HomePage = () => {
    const[feedType, setFeedType] = useState("forYou");

    return (
        <>
            <div className='flex-[4_4_0] mr-auto md:border-x border-gray-700 min-h-screen min-w-0 md:mb-0 mb-[52px]'>
                {/*Header*/}
                <div className='flex w-full border-b border-gray-700'>
                    <div
                        className={"flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"}
                        onClick={() => setFeedType("forYou")}>
                        Untuk Kamu
                        {feedType === 'forYou' && (
                            <div className='absolute bottom-0 w-10 h-1 rounded-full bg-primary' />
                        )}
                    </div>
                    <div className='flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative' onClick={() => setFeedType('following')}>
                        Following Kamu
                        {feedType === 'following' && (
                            <div className='absolute bottom-0 w-10 h-1 rounded-full bg-primary'/>
                        )}
                    </div>
                </div>

                <CreatePost/>
                <Posts feedType={feedType} />

            </div>
        </>
    )

};
export default HomePage;