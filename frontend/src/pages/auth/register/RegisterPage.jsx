import { Link } from "react-router-dom";
import { useState } from "react";

import XSvg from "../../../components/svgs/F.jsx";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingDots from "../../../components/common/loading/LoadingDots.jsx";
import GoogleSVG from "../../../components/svgs/GoogleSVG.jsx";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        fullName: "",
        password: "",
    });

    const {mutate, isError, isPending, error} = useMutation({
        mutationFn: async ({email, username, fullName, password}) => {
            const res = await fetch('/api/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, username, fullName, password}),
            });

            const data = await res.json();
            if(!res.ok) throw new Error(data.error || 'Something went wrong');
            console.log(data)
            return data;
        },
        onSuccess: () => {
            toast.success('Akun kamu berhasil tardaftar. Login sudah!!')
        },
        onError: (error) => {
            toast.error(error.message);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='max-w-screen-xl mx-auto flex h-screen px-10'>
            <div className='flex-1 hidden lg:flex items-center justify-center'>
                <XSvg className=' lg:w-2/3 fill-white' />
            </div>
            <div className='flex-1 flex flex-col justify-center items-center'>
                <form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col' onSubmit={handleSubmit}>
                    <XSvg className='w-24 lg:hidden fill-white' />
                    <h1 className='text-4xl font-extrabold text-white'>Join Frenku<span className='font-medium text-sm text-gray-600 ml-2'>by ferdi</span></h1>
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdOutlineMail />
                        <input
                            type='email'
                            className='grow'
                            placeholder='Email'
                            name='email'
                            onChange={handleInputChange}
                            value={formData.email}
                        />
                    </label>
                    <div className='flex gap-4 flex-wrap'>
                        <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
                            <FaUser />
                            <input
                                type='text'
                                className='grow '
                                placeholder='Username'
                                name='username'
                                onChange={handleInputChange}
                                value={formData.username}
                            />
                        </label>
                        <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
                            <MdDriveFileRenameOutline />
                            <input
                                type='text'
                                className='grow'
                                placeholder='Full Name'
                                name='fullName'
                                onChange={handleInputChange}
                                value={formData.fullName}
                            />
                        </label>
                    </div>
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdPassword />
                        <input
                            type='password'
                            className='grow'
                            placeholder='Password'
                            name='password'
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                    </label>
                    <button className='btn rounded-full btn-primary text-white'>
                        {isPending ? <LoadingDots size='sm' /> : "Register"}
                    </button>
                </form>
                <div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
                    <p className='text-white text-center'>Sudah punya akun? Login lah</p>
                    <Link to='/login'>
                        <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Login</button>
                    </Link>
                    <span className='text-center'>or</span>
                    <button className='btn rounded-full btn-outline'>
                        <GoogleSVG className=' w-7 ' />
                        Login with google
                    </button>
                </div>
            </div>
        </div>
    );
};
export default RegisterPage;