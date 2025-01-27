import {formatDistanceToNow} from "date-fns";
import { id } from "date-fns/locale";


function getTimeAgo(createdAt) {
    const now = new Date();
    const postDate = new Date(createdAt);
    const seconds = Math.floor((now - postDate) / 1000);

    let interval = Math.floor(seconds / 31536000); // Hitung tahun
    if (interval >= 1) {
        return interval + ' tahun';
    }

    interval = Math.floor(seconds / 2592000); // Hitung bulan
    if (interval >= 1) {
        return interval + ' bulan';
    }

    interval = Math.floor(seconds / 86400); // Hitung hari
    if (interval >= 1) {
        return interval + ' hari';
    }

    interval = Math.floor(seconds / 3600); // Hitung jam
    if (interval >= 1) {
        return interval + ' jam';
    }

    interval = Math.floor(seconds / 60); // Hitung menit
    if (interval >= 1) {
        return interval + ' menit';
    }

    return 'Baru saja';
}

const PostTime = ({ createdAt }) => {

    const timeAgo = getTimeAgo(createdAt);
    return <span> · {timeAgo}</span>
}

export default PostTime