import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRef } from 'react';
import { Todo } from './hooks/useTodos';

const TodoForm = () => {
  const queryClient = useQueryClient();
  const ref = useRef<HTMLInputElement>(null);

  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (newTodo: Todo) => {
      return axios
        .post<Todo>('https://jsonplaceholder.typicode.com/todos', {
          ...newTodo,
        })
        .then((res) => res.data);
    },
    onSuccess: (savedTodo, newTodo) => {
      // In real app, we need to invalidate or update the todos query here
      // alert(`Todo added with title: ${savedTodo.title}`);
      // queryClient.invalidateQueries({ queryKey: ['todos'] });

      // Update data in cache directly (not recommended for complex cases)
      // const previousTodos = queryClient.getQueryData<Todo[]>(['todos']) || [];
      queryClient.setQueryData<Todo[]>(['todos'], todos => [
        savedTodo, ...(todos || [])
      ]);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (ref.current && ref.current.value){
      // alert(`Adding todo with title: ${ref.current.value}`);
      addTodo.mutate({
        id: 0,
        title: ref.current.value,
        userId: 1,
        completed: false,
      });
      ref.current.value = '';
    }
  };

  return (
    <>
    { addTodo.isError && <div className="alert alert-danger">{addTodo.error.message}</div>}
    <form className="row mb-3" onSubmit={handleSubmit}>
      <div className="col">
        <input ref={ref} type="text" className="form-control" />
      </div>
      <div className="col">
        <button className="btn btn-primary" disabled={addTodo.isLoading}>{addTodo.isLoading ? 'Adding...' : 'Add'}</button>
      </div>
    </form>
    </>
  );
};

export default TodoForm;
