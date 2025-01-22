import { useState } from "react";
import { Link } from "react-router-dom";

import XSvg from "../../../components/svgs/F.jsx";

import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const queryClient = useQueryClient();

    const {mutate: loginMutation, isPending, isError, error} = useMutation({
         mutationFn: async ({ username, password }) => {
             const res = await fetch('/api/auth/login', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({username, password}),
             })

             const data = await res.json();
             if(!res.ok) throw new Error(data.error || 'Something went wrong!');
             return data;
         },
         onSuccess: () => {
         //    refetch the authUser
             queryClient.invalidateQueries({queryKey: ['authUser']})
         },
         onError: (error) => {
             toast.error(error.message)
         }

     })

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='max-w-screen-xl mx-auto flex h-screen'>
            <div className='flex-1 hidden lg:flex items-center  justify-center'>
                <XSvg className='lg:w-[90%] fill-white' />
            </div>
            <div className='flex-1 flex flex-col justify-center items-center'>
                <form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
                    <XSvg className='w-24 lg:hidden fill-white' />
                    <h1 className='text-4xl font-extrabold text-white'>Ayo Frenku<span
                        className='font-medium text-sm text-gray-600 ml-2'>by ferdi</span></h1>
                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdOutlineMail />
                        <input
                            type='text'
                            className='grow'
                            placeholder='username'
                            name='username'
                            required
                            onChange={handleInputChange}
                            value={formData.username}
                        />
                    </label>

                    <label className='input input-bordered rounded flex items-center gap-2'>
                        <MdPassword />
                        <input
                            type='password'
                            className='grow'
                            placeholder='Password'
                            name='password'
                            required
                            onChange={handleInputChange}
                            value={formData.password}
                        />
                    </label>
                    <button className='btn rounded-full btn-primary text-white'>
                        {isPending ? <span className="loading loading-dots loading-sm"/> : 'Login'}
                    </button>
                </form>
                <div className='flex flex-col gap-2 mt-4'>
                    <p className='text-white '>Tidak punya akun? Daftar dululah</p>
                    <Link to='/register'>
                        <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign up</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;