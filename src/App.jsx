import { useEffect, useState } from "react";
import classes from "./styles.module.css";
import ToDoItem from "./components/todo-items";
import ToDoDetails from "./components/todo-details";
import { CircularProgress } from "@mui/material";

function App() {
  const [getList, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todoDetails, setTodoDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  async function fetchListOfToDos() {
    try {
      setLoading(true);
      const listOfToDO = await fetch("https://dummyjson.com/todos");
      const apiRes = await listOfToDO.json();
      console.log(apiRes);
      if (apiRes?.todos && apiRes?.todos.length > 0) {
        setLoading(false);
        setList(apiRes?.todos);
        setError("");
      } else {
        setList([]);
        setLoading(false);
        setError("");
      }
    } catch (error) {
      setError("SOMETHING WENT WRONG!");
      console.log("SOMETHING WENT WRONG!");
    }
  }

  async function getTodoDetails(getCurrentTodo) {
    // console.log(getCurrentTodo);
    try {
      const singleItemTodo = await fetch(
        `https://dummyjson.com/todos/${getCurrentTodo}`
      );
      const result = await singleItemTodo.json();
      console.log(result);
      if (result) {
        setTodoDetails(result);
        setOpenDialog(true);
      } else {
        setTodoDetails(null);
        setOpenDialog(false);
      }
    } catch (error) {
      console.log("SOMETHING WENT WRONG!");
    }
  }

  useEffect(() => {
    fetchListOfToDos();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <>
      <div className={classes.wrapper}>
        <h1 className={classes.headerTitle}>
          To Do Application Using Material UI!
        </h1>
        <div className={classes.todoListWrapper}>
          {getList?.length > 0
            ? getList.map((singleItem) => (
                <ToDoItem getTodoDetails={getTodoDetails} todo={singleItem} />
              ))
            : null}
        </div>
        <ToDoDetails
          setOpenDialog={setOpenDialog}
          openDialog={openDialog}
          todoDetails={todoDetails}
          setTodoDetails={setTodoDetails}
        />
      </div>
    </>
  );
}

export default App;
