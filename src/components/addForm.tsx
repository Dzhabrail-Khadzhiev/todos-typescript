import React from "react";
import { BiPlusCircle } from "react-icons/bi";
import { TailSpin } from "react-loader-spinner";
import { useAppSelector } from "../hooks/hooks";
interface AddFormProps {
  value: string;
  handleAction: () => void;
  updateText: (srt: string) => void;
}

const AddForm: React.FC<AddFormProps> = ({
  value,
  updateText,
  handleAction,
}) => {
  const { isLoading } = useAppSelector((state) => state.todos);

  const addTodoPlus = (
    <TailSpin
      height="15"
      width="15"
      color="#FFFFFF"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );

  return (
    <label className="parent">
      <input
        className="header-input"
        placeholder="Что вы планируете сделать?"
        value={value}
        onChange={(event) => updateText(event.target.value)}
      />
      <button className="header-btn" onClick={handleAction}>
        Добавить
        {isLoading ? addTodoPlus : <BiPlusCircle />}
      </button>
    </label>
  );
};

export default AddForm;
