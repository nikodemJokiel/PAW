import {useQuery} from "@tanstack/react-query";
import type {Post} from "../types/Post/Post.ts";

const getPost = async(id: string | number) => {
    return await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => res.json());
}

export const usePost= (id:string | number)=> {
    return useQuery<Post>({
        queryKey:['posts', id],
        queryFn: ()=> getPost(id),
    })
}
