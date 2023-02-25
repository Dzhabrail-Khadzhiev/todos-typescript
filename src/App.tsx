import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import AddForm from "./components/addForm";
import { useAppDispatch } from "./hooks/hooks";
import { fetchTodos, addNewTodo } from "./store/TodoSlice";
import Header from "./components/Header";

function App() {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const addTask = () => {
    dispatch(addNewTodo(text));
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div className="App">
      <Header />

      <AddForm value={text} updateText={setText} handleAction={addTask} />

      <TodoList />
    </div>
  );
}

export default App;
