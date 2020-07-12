import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  makeStyles,
  Input,
} from "@material-ui/core";
import "./TodoItem.css";
import db from "../firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 30;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function TodoItem({ todo }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const deleteItem = (event) => {
    db.collection("todos")
      .doc(todo.id)
      .delete()

      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = () => {
    db.collection("todos").doc(todo.id).set(
      {
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <h2>Edit Item</h2>
          <Input
            placeholder={todo.text}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <Button onClick={updateTodo}>Confirm</Button>
        </div>
      </Modal>
      <List className="todoItem__list">
        <ListItem button>
          {/* <ListItemAvatar>
          <Avatar></Avatar>
        </ListItemAvatar> */}
          <ListItemText primary={`✔💨${todo.text}`} secondary={"Deadline ⏰"} />
        </ListItem>
        <Button>
          <DeleteForeverIcon onClick={deleteItem} />
        </Button>
        <Button onClick={handleOpen}>
          <EditIcon />
        </Button>
      </List>
    </>
  );
}

export default TodoItem;
