import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

const usePosts = (selectedUserId: number | undefined) => {
    const { data: posts, error, isLoading } = useQuery<Post[], Error>({
        queryKey: selectedUserId ? ['users', selectedUserId, 'posts'] : ['posts'],
        queryFn: () => axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
            params: { userId: selectedUserId }
        }).then((res) => res.data),
        staleTime: 1 * 60 * 1000, // 1 minute
    })

    return { posts, error, isLoading }
}

export default usePosts;