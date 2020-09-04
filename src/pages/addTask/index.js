import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import NewTask from "../../components/newTask";
import styles from "./addTask.module.scss";

const AddTask = () => {
  const [redirect, toggleRedirect] = useState(false);

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.addNewTaskContainer}>
      <h1>Create New Task</h1>
      <NewTask onAdd={() => toggleRedirect(true)} />
    </div>
  );
};

export default AddTask;
