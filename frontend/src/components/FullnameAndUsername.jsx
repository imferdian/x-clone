import { Link } from 'react-router-dom';
import PostTime from './PostTime.jsx';
import useWindowsSize from '../hooks/useWindowsSize.jsx';
import {useEffect, useRef, useState} from "react";

const FullnameAndUsername = ({ fullName, username, createdAt }) => {
    const MAX_NAME_LENGTH = 22;

    const containerRef = useRef(null);
    const [contWidth, setContWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            setContWidth(containerRef.current.offsetWidth);
        }
    }, [containerRef.current]);

    const { width } = useWindowsSize()
    const nameLength = fullName.length;
    const nameLengthLong = nameLength >= 21
    const nameLengthToLong = nameLength > MAX_NAME_LENGTH;
    const maxWidth = Math.min(200, contWidth * 0.25);

    function getDisplayName(fullName, nameLengthToLong, width) {
        if (nameLengthToLong && width <= 440) {
            return `${fullName.substring(0, MAX_NAME_LENGTH)}...`;
        }
        return fullName;
    }

    function getDisplayUsername(nameLengthToLong, width, username) {
        if (nameLengthToLong && width <= 420) {
            return null;
        }
        if (width >= 420 && width <= 500 && nameLengthToLong) {
            return `@... `;
        }
        return `@${username}`;
    }

    return (
        <>
            <div className='flex w-full gap-1 items-center' ref={containerRef} >
                <div>
                    <Link to={`/profile/${username}`} className='font-bold text-nowrap truncate'>
                        {getDisplayName(fullName, nameLengthToLong, width)}
                    </Link>
                </div>
                <div className='flex text-gray-700 text-sm gap-1'>
                    <span style={{ maxWidth: nameLengthLong ? `${maxWidth}px` : '200px' }} className='truncate'>
                      <Link to={`/profile/${username}`}>
                        {getDisplayUsername(nameLengthToLong, width, username)}
                      </Link>
                    </span>
                    <span className='text-nowrap'>
                      <PostTime createdAt={createdAt} />
                    </span>
                </div>
            </div>
        </>
    );
};

export default FullnameAndUsername;