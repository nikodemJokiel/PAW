import {useQuery} from "@tanstack/react-query";
import type {Post} from "../types/Post/Post.ts";

const getPost = async(id: string) => {
    return await fetch(`http://localhost:3000/api/posts/${id}`).then((res) => res.json());
}

export const usePost= (id:string | undefined)=> {
    return useQuery<Post>({
        queryKey:['posts', id],
        queryFn: ()=> getPost(id!),
        enabled: !!id,
    })
}
