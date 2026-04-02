import type {Post} from "../types/Post/Post.ts";
import {useQuery} from "@tanstack/react-query";

const getPosts = async () => {
    return await fetch('http://localhost:3000/api/posts').then((res) => res.json());
}

export const usePosts = () => {
    return useQuery<Array<Post>>({
        queryKey:['posts'],
        queryFn:getPosts,
    })
}