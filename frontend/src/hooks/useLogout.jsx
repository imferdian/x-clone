import {useMutation, useQueryClient} from '@tanstack/react-query';
import toast from "react-hot-toast";

export const logoutUser = async () => {
    const res = await fetch('/api/auth/logout', {
        method: 'POST',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Something went wrong!');
    return data;
};

const useLogout = () => {
    const queryClient = useQueryClient();

    const { mutate: logout, isError, error } = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
            toast.success('Logout berhasil!');
        },
        onError: () => {
            toast.error('Gagal logout awokaoakw!!');
        },
    });

    return { logout, isError, error };
};

export default useLogout;