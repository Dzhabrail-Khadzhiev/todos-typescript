import { useAppSelector } from "../hooks/hooks";
import TodoItem from "./TodoItem";
import sumka from "../images/clipboard.png";

const TodoList: React.FC = () => {
  const { list } = useAppSelector((state) => state.todos);
  const completedTodo = list.filter((todo) => todo.completed === true);

  if (list.length <= 0) {
    return (
      <div className="standart">
        <img src={sumka} alt="" />
        <p>У вас пока нет добавленных задач</p>
      </div>
    );
  }
  return (
    <ul>
      <div className="todo-txt">
        <div className="first-todo-txt">
          <p>Всего задач</p>
          <span>{list.length}</span>
        </div>
        <div className="second-todo-txt">
          <p>Выполнено</p>
          <span>
            {completedTodo.length} из {list.length}
          </span>
        </div>
      </div>
      <hr />
      {list.map((todo) => (
        <TodoItem key={todo._id} {...todo} />
      ))}
    </ul>
  );
};

export default TodoList;

