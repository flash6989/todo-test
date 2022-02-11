import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";
import styles from "./AddTodo.module.css";

function AddTodo({ setTodo, todo, addTodo }) {
  const [value, setValue] = useState("");

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      saveTodo();
    }
  }

  function saveTodo() {
    if (value.length > 3) {
      setTodo([
        ...todo,
        {
          id: uuidv4(),
          title: value,
          status: true,
        },
      ]);

      addTodo(value);
      setValue("");
    } else {
      alert("Нужно ввести более 3 симолов");
    }
  }

  return (
    <div className={styles.row}>
      <div className={styles.addTodoForm}>
        <Input
          className={styles.input}
          placeholder="Напишите задачу"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyPress}
          value={value}
        />

        <Button
          size="large"
          variant="contained"
          className={styles.btn}
          onClick={saveTodo}
        >
          Добавить
        </Button>
      </div>
    </div>
  );
}

export default AddTodo;
