import {useQuery} from "@tanstack/react-query";
import type {Comment} from "../types/Comment/Comment.ts";

const getComments = async(postId: string) => {
    return await fetch(`http://localhost:3000/api/posts/${postId}/comments`).then((res) => res.json());
}

export const useComments = (postId: string | undefined) => {
    return useQuery<Comment[]>({
        queryKey:['comments', postId],
        queryFn: () => getComments(postId!),
        enabled: !!postId,
    })
}
