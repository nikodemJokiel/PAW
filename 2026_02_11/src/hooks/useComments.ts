import {useQuery} from "@tanstack/react-query";
import type {Comment} from "../types/Comment/Comment.ts";

const getComments = async(postId: string | number) => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`).then((res) => res.json());
}

export const useComments = (postId: string | number) => {
    return useQuery<Comment[]>({
        queryKey:['comments', postId],
        queryFn: () => getComments(postId),
    })
}
