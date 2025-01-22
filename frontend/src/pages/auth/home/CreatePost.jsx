import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingDots from "../../../components/common/loading/LoadingDots.jsx";

const CreatePost = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const imgRef = useRef(null);

    const {data: authUser} = useQuery({queryKey: ['authUser']});
    const queryClient = useQueryClient()

    const {mutate: createPost, isPending,} = useMutation({
        mutationFn: async ({text, img}) => {
            const res = await fetch('/api/posts/create', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({text, img}),
            })
            const data = await res.json();
            if(!res.ok) throw new Error(data.error || 'Something went wrong!');
            return data
        },
        onSuccess: () => {
            setText('')
            setImg(null)
            toast.success("Berhasil. Makasih udah speak up ;)")
            queryClient.invalidateQueries({queryKey: ['posts']});
        },
        onError: () => {
            toast.error("Yaahhh. Gagal ngepost :(")
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isPending) return;
        createPost({text, img})
    };


    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='flex p-4 pb-1 items-start gap-4 border-b border-gray-700 max-h-max'>
            <div className='avatar'>
                <div className='w-9 rounded-full'>
                    <img alt='Profile Img' src={authUser.profileImg || "/avatar-placeholder.png"} />
                </div>
            </div>
            <form className='flex flex-col w-full max-h-full pt-1' onSubmit={handleSubmit}>
				<textarea
                    className=' border-none textarea w-full p-0 text-xl resize-none focus:outline-none bg-transparent'
                    placeholder='Ada cerita? tulis sini aja brok!'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                {img && (
                    <div className='mt-5 mr-10'>
                        <div className='relative w-fit mx-auto'>
                            <IoCloseSharp
                                className='absolute -top-3 -right-3 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer'
                                onClick={() => {
                                    setImg(null);
                                    imgRef.current.value = null;
                                }}
                            />
                            <img alt='Image Post' src={img} className='w-full mx-auto h-72 object-contain rounded' />
                        </div>
                    </div>
                )}
                <div className='flex justify-between py-2'>
                    <div className='flex gap-3 items-center'>
                        <CiImageOn
                            className='fill-primary w-5 h-5 cursor-pointer'
                            onClick={() => imgRef.current.click()}
                        />
                        <BsEmojiSmileFill className='fill-primary w-4 h-4 cursor-pointer' />
                    </div>
                    <input type='file'  accept='image/*' hidden ref={imgRef} onChange={handleImgChange} />
                    <button className='btn btn-primary rounded-full btn-sm text-white px-4'>
                        {isPending ? <LoadingDots size='sm' /> : "Post"}
                    </button>
                </div>
            </form>
        </div>
    );
};
export default CreatePost;