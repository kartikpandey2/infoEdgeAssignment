import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import NewTask from "../../components/newTask";
import { getTaskById } from "../../utils/task";
import styles from "../addTask/addTask.module.scss";

const UpdateTask = (props) => {
  const taskId = props.match.params.taskId;
  const task = getTaskById(taskId);

  const [redirect, toggleRedirect] = useState(false);

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.addNewTaskContainer}>
      <h1>Update Task</h1>
      <NewTask
        update={true}
        task={task}
        onUpdate={() => toggleRedirect(true)}
      />
    </div>
  );
};

export default UpdateTask;
