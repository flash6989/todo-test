import { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo/AddTodo";
import Header from "./components/Header/Header";
import TodoList from "./components/TodoList/TodoList";
import { Container } from "@mui/material";
import axios from "axios";
import "./App.css";

const url = process.env.REACT_APP_FETCH_URL;

function App() {
  const [todo, setTodo] = useState([]);

  console.log(url);

  useEffect(() => {
    axios.get(`${url}todos?_sort=status&_order=desc`).then((resp) => {
      setTodo(resp.data);
    });
  }, [setTodo]);

  function addTodo(input) {
    const newItem = {
      id: Math.random().toString(36).substring(2, 9),
      title: input,
      status: true,
    };
    axios.post(`${url}todos/`, newItem);
  }

  function deleteTodo(id) {
    axios.delete(`${url}todos/${id}`);
  }

  function patchTodo(id) {
    console.log(id, "Передан id");
    let todoPatch = [...todo].find(function (item) {
      return item.id === id;
    });

    console.log(todo, "TODOPATCH");

    axios.patch(`${url}todos/${id}`, todoPatch);

    axios.get(`${url}todos?_sort=status&_order=desc`).then((resp) => {
      setTodo(resp.data);
    });
  }

  console.log(todo);

  return (
    <Container className="App">
      <Header />
      <AddTodo addTodo={addTodo} todo={todo} setTodo={setTodo} />
      <TodoList
        patchTodo={patchTodo}
        deleteTodoItem={deleteTodo}
        todo={todo}
        setTodo={setTodo}
      />
    </Container>
  );
}

export default App;
