import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { toggleStatus, deleteTodo } from "../store/TodoSlice";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TailSpin } from "react-loader-spinner";
interface TodoItemProps {
  _id: string;
  title: string;
  completed: boolean;
  created_at: number;
}

const TodoItem: React.FC<TodoItemProps> = ({
  _id,
  title,
  completed,
  created_at,
}) => {
  const dispatch = useAppDispatch();
  const { isLoadingDelete } = useAppSelector((state) => state.todos);

  const deleleLoader = (
    <TailSpin
      height="15"
      width="15"
      color="#808080"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );

  const CreatedAt = () => {
    let a: number = Math.ceil((Date.now() - created_at) / 60000);
    if (a < 1) {
      return "меньше минуты назад";
    }
    if (a >= 24 * 60) {
      a = Math.ceil((a / 24) * 60);
      return `${a} ${a === 1 ? "день" : a > 1 && a > 5 ? "дня" : "дней"} назад`;
    }
    if (a >= 60) {
      a = Math.ceil(a / 60);
      return `${a} ${
        a === 1 ? "час" : a > 1 && a < 5 ? "часа" : "часов"
      } назад`;
    } else {
      return `${a} ${
        a === 1 ? "минуту" : a > 1 && a < 5 ? "минуты" : "минут"
      } назад`;
    }
  };

  return (
    <li key={_id}>
      <input
        className="form-check-input"
        type="checkbox"
        id="checkboxNoLabel"
        value=""
        aria-label="..."
        onChange={() => dispatch(toggleStatus(_id))}
        checked={completed}
      />

      <p className={completed ? "line-through" : ""}>
        {title}
        <span className="fff"> {CreatedAt()}</span>
      </p>
      {/* <p>{title}</p> */}
      <span className="delete" onClick={() => dispatch(deleteTodo(_id))}>
        {isLoadingDelete === _id ? deleleLoader : <RiDeleteBin6Line />}
      </span>
    </li>
  );
};

export default TodoItem;
