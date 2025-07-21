import { setTodos } from "../../store/todo/todoSlice";
import { apiSlice } from "../apiSlice";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const todoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => 'todos',
      providesTags: ['Todo'],
      transformResponse: (response: any[]) => {
        const updatedData: Todo[] = response.map(item => ({
          ...item,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));
      
        return updatedData;
      },
      
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTodos(data));
        } catch (error) {
          console.log('Failed to fetch todos:', error);
        }
      },
    }),
    
  }),

});

export const { useGetTodosQuery } = todoApi;