import {FaEllipsis} from "react-icons/fa6";

const DeleteDropdown = ({ children, text }) => {
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="p-2 rounded-full hover:bg-base-300/80 ">
                <FaEllipsis className={`text-${text}`} />
            </div>
            <ul tabIndex={0} className="dropdown-content rounded-md menu bg-base-100 z-[1] w-40 p-2 shadow border border-white/20">
                {children}
            </ul>
        </div>
    )
}

export default DeleteDropdown