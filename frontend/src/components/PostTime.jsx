import {formatDistanceToNow} from "date-fns";
import { id } from "date-fns/locale";

const PostTime = ({ createdAt }) => {

    const postDate = new Date(createdAt);

    const timeAgo = formatDistanceToNow(postDate, {
        addSuffix: true,
        locale: id
    })

    return <span>{timeAgo}</span>
}

export default PostTime