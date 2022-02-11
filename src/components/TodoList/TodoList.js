import { useState } from "react";
import styles from "./TodoList.module.css";
import Button from "@mui/material/Button";
import { Input } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faTrash,
  faEdit,
  faMinus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

function TodoList({ todo, setTodo, deleteTodoItem, patchTodo }) {
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState();

  function deleteTodo(id) {
    let bool = window.confirm("Вы уверены что хотите удалить данную запись");
    if (bool) {
      let newTodo = [...todo].filter((item) => item.id !== id);

      setTodo(newTodo);
    }
    deleteTodoItem(id);
  }

  function statusTodo(id) {
    let newTodo = [...todo].filter((item) => {
      if (item.id === id) {
        item.status = !item.status;
      }
      return item;
    });
    setTodo(newTodo);
    patchTodo(id);
  }

  function editTodo(id, title) {
    setEdit(id);
    setValue(title);
  }

  function saveTodo(id) {
    if (value.length > 3) {
      let newTodo = [...todo].map((item) => {
        if (item.id === id) {
          item.title = value;
        }
        return item;
      });

      setTodo(newTodo);
      patchTodo(id);

      setEdit(null);
    } else {
      alert("Нужно ввести более 3 симолов");
    }
  }

  return (
    <div>
      {todo.map((item) => (
        <div key={item.id} className={styles.listItems}>
          {edit === item.id ? (
            <Input
              autoFocus
              className={styles.input}
              onChange={(e) => setValue(e.target.value)}
              value={value}
              onKeyDown={function (e) {
                if (e.key === "Enter") {
                  saveTodo(item.id);
                }
              }}
            />
          ) : (
            <>
              <Button
                size="large"
                variant="contained"
                sx={{
                  marginRight: "10px",
                }}
                onClick={() => {
                  statusTodo(item.id);
                }}
              >
                {item.status ? (
                  <FontAwesomeIcon icon={faMinus} />
                ) : (
                  <FontAwesomeIcon icon={faCheck} />
                )}
              </Button>
              <div
                onClick={() => {
                  editTodo(item.id, item.title);
                }}
                className={!item.status ? styles.close : ""}
              >
                {item.title}
              </div>
            </>
          )}

          {edit === item.id ? (
            <div>
              <Button
                size="large"
                variant="contained"
                onClick={() => saveTodo(item.id)}
              >
                <FontAwesomeIcon icon={faSave} />
              </Button>
            </div>
          ) : (
            <div>
              <Button
                size="large"
                variant="contained"
                onClick={() => {
                  editTodo(item.id, item.title);
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button
                sx={{
                  marginLeft: "5px",
                }}
                size="large"
                variant="contained"
                onClick={() => {
                  deleteTodo(item.id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TodoList;
