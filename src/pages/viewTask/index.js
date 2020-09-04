import React from "react";
import NewTask from "../../components/newTask";
import { getTaskById } from "../../utils/task";
import styles from "../addTask/addTask.module.scss";

const ViewTask = (props) => {
  const taskId = props.match.params.taskId;
  const task = getTaskById(taskId);

  return (
    <div className={styles.addNewTaskContainer}>
      <h1>View Task</h1>
      <NewTask readOnly={true} task={task} />
    </div>
  );
};

export default ViewTask;
