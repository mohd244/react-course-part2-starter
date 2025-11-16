import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
}

const useTodos = () => {
    const { data: todos, isLoading, error } = useQuery<Todo[], Error>({
        queryKey: ['todos'],
        queryFn: () => {
            return axios
                .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
                .then((res) => res.data)
        }
    });

    return { todos, error, isLoading }

}

export default useTodos;