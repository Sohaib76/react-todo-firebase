import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import TodoItem from "./TodoItem";
import db from "../firebase";
import firebase from "firebase";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //when the app loads, we need to listen to database and fetch new items
  //as they get added or update
  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, text: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setTodos([...todos, input]);
    setInput("");
  };

  return (
    <div>
      <h1>PLANNING IS THE KEY</h1>
      <form>
        <FormControl>
          <InputLabel>✔ ✨Type Todo Item</InputLabel>
          <Input
            onChange={(event) => setInput(event.target.value)}
            value={input}
          />
        </FormControl>
        <Button
          type="submit"
          onClick={addTodo}
          variant="contained"
          color="primary"
          disabled={!input}
        >
          Add Item
        </Button>
      </form>

      <ul>
        {todos.map((todo, id) => (
          <TodoItem key={id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default Todo;
