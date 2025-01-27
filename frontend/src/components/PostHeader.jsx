import {Link} from "react-router-dom";

import { useState, useEffect, useRef } from 'react';
import PostTime from "./PostTime.jsx";

function PostHeader({ fullName, username, createdAt }) {
    const containerRef = useRef(null);
    const [showUsername, setShowUsername] = useState(true);

    useEffect(() => {
        // Cek lebar container
        const containerWidth = containerRef.current.offsetWidth;
        const fullNameWidth = containerRef.current.querySelector('.fullname').scrollWidth;
        const usernameWidth = containerRef.current.querySelector('.username').scrollWidth;

        // Kalau fullname + username kepanjangan, sembunyikan username
        if (fullNameWidth + usernameWidth > containerWidth) {
            setShowUsername(false);
        }
    }, [fullName, username]);

    return (
        <div ref={containerRef} className='flex gap-2 items-center border w-full overflow-hidden'>
            {/* Fullname */}
            <span className='fullname font-bold truncate'>
                <Link to={`/profile/${username}`}>
                    {fullName}
                </Link>
            </span>
            {/* Username (conditional rendering) */}
            {showUsername && (
                <span className='username text-sm text-gray-700 truncate'>
                    @{username}
                </span>
            )}
            <span className='text-gray-700 text-sm'>·</span>
            <span className='text-gray-700 text-sm text-nowrap'>
                <PostTime createdAt={createdAt} />
            </span>
        </div>
    );
}

export default PostHeader;