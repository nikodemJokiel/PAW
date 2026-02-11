import {useQuery} from "@tanstack/react-query";
import type {User} from "../types/User/User.ts";

const getUser = async(userId: number) => {
    return await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then((res) => res.json());
}

export const useUser = (userId: number) => {
    return useQuery<User>({
        queryKey:['users',userId],
        queryFn: () => getUser(userId),
    })
}
