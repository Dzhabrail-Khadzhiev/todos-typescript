import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { json } from "stream/consumers";

type Todo = {
  _id: string;
  title: string;
  completed: boolean;
  created_at:number,
};

type TodoState = {
  list: Todo[];
  isLoading: boolean;
  isLoadingDelete: string;
  error: string | null;
};

export const fetchTodos = createAsyncThunk<
  Todo[],
  undefined,
  { rejectValue: string }
>("todos/fetchTodos", async function (_, { rejectWithValue }) {
  const response = await fetch("https://unicode-todo.onrender.com/todos");

  if (!response.ok) {
    throw new Error("Server Error!");
  }

  const data = await response.json();

  return data;
});

export const addNewTodo = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string }
>("todos/addNewTodo", async function (text, { rejectWithValue }) {
  const todo = {
    title: text,
  };

  const response = await fetch("https://unicode-todo.onrender.com/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    return rejectWithValue("Can't add task. Server error.");
  }
  return (await response.json()) as Todo;
});

export const toggleStatus = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string; state: { todos: TodoState } }
>("todos/toggleStatus", async function (id, { rejectWithValue, getState }) {
  const todo = getState().todos.list.find((todo) => todo._id === id);
  if (todo) {
    const response = await fetch(
      `https://unicode-todo.onrender.com/todos/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      }
    );

    if (!response.ok) {
      return rejectWithValue("Can't toggle status. Server error.");
    }
    return (await response.json()) as Todo;
  }
  return rejectWithValue("no sach todo");
});

export const deleteTodo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("todos/deleteTodo", async function (id, { rejectWithValue }) {
  const response = await fetch(
    `https://unicode-todo.onrender.com/todos/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    return rejectWithValue("Can't delete task. Server error.");
  }
  return id;
});

const initialState: TodoState = {
  list: [],
  isLoading: false,
  isLoadingDelete: "",
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
      })

      .addCase(addNewTodo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.isLoading = false;
      })

      .addCase(toggleStatus.fulfilled, (state, action) => {
        const toggleTodo = state.list.find(
          (todo) => todo._id === action.payload._id
        );
        if (toggleTodo) {
          toggleTodo.completed = !toggleTodo.completed;
        }
      })

      .addCase(deleteTodo.pending, (state, action) => {
        state.isLoadingDelete = action.meta.arg;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((todo) => todo._id !== action.payload);
        state.isLoadingDelete = "";
      });
  },
});

export default todoSlice.reducer;
