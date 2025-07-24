import { createSlice } from '@reduxjs/toolkit';
import { Item } from '../../components/Home/TodoItem';

interface IState {
  data: Item[]
}

const initialState: IState = {
  data: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.data = action.payload;
    },
    addTodo: (state, action) => {
      state.data = [...state?.data, action?.payload];
    },
    editTodo: (state, action) => {
        const { id, title, updatedAt } = action.payload;
        const item = state?.data.find(todo => todo?.id === id);
        if (item) {
          item.title = title;
          item.updatedAt = updatedAt
        }
      },
      deleteTodo: (state, action) => {
        state.data = state.data.filter(todo => todo.id !== action.payload);

      }
  },
});

export const { setTodos, addTodo, editTodo,deleteTodo} = todoSlice.actions;
export default todoSlice.reducer;
