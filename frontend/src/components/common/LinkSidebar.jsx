import {Link} from "react-router-dom";

const LinkSidebar = ({ to, name, children }) => {
    return (
        <li className='flex flex-1 justify-center md:justify-start'>
            <Link
                to={to}
                className=' flex gap-4 items-center px-7 py-1 hover:bg-stone-900 transition-all rounded-full duration-300 md:py-2 md:pl-2 md:pr-4 max-w-fit cursor-pointer'
            >
                {children}
                <span className='text-lg hidden md:block'>{name}</span>
            </Link>
        </li>
    )
}

export default LinkSidebar;