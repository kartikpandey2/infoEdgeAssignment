import React, { useState } from "react";
import { AutoComplete, Tag } from "antd";
import TaskTray from "../../components/taskTray";
import TaskCard from "../../components/taskCard";
import { getTask, deleteTask, updateTask } from "../../utils/task";
import styles from "./home.module.scss";

const allTaskTray = [
  {
    name: "Todo",
    taskListName: "todoTask",
    showOptions: true,
  },
  {
    name: "Completed",
    taskListName: "completedTask",
    showOptions: false,
  },
  {
    name: "Due",
    taskListName: "dueTask",
    showOptions: false,
  },
];

const priorityOrder = {
  high: 1,
  medium: 2,
  low: 3,
};

const renderItem = (task) => {
  let taskStatus = task.status;
  let tagColor = "blue";

  if (task.status === "OPEN" && Date.now() > task.dueDate) {
    taskStatus = "DUE";
    tagColor = "red";
  }

  if (task.status === "COMPLETED") {
    tagColor = "green";
  }

  return {
    value: task.name,
    label: (
      <div className={styles.itemsContainer}>
        <div className={styles.itemRow}>
          <div className={styles.itemName}>{task.name}</div>
          <Tag color={tagColor}>{taskStatus}</Tag>
        </div>
        <div className={styles.itemDescription}>{task.description}</div>
      </div>
    ),
  };
};

const Home = () => {
  const [taskList, updateTaskList] = useState(getTask());
  const [autoCompleteOptions, updateAutoCompleteOptions] = useState(getTask());

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
    updateTaskList(getTask());
  };

  const updateTaskStatus = (task, status) => {
    const updatedTask = { ...task, status };

    updateTask(task.id, updatedTask);
    const tasks = getTask();
    updateTaskList(tasks);
    updateAutoCompleteOptions(tasks);
  };

  const onSearch = (value) => {
    if (!value) {
      return updateAutoCompleteOptions(getTask());
    }

    const filterAutoCompleteOptions = autoCompleteOptions.filter((task) =>
      task.name.includes(value)
    );

    updateAutoCompleteOptions(filterAutoCompleteOptions);
  };

  const taskObj = {
    todoTask: [],
    completedTask: [],
    dueTask: [],
  };

  for (let i = 0; i < taskList.length; ++i) {
    const task = taskList[i];

    if (task.status === "COMPLETED") {
      taskObj.completedTask.push(task);
    } else if (task.status === "OPEN" && Date.now() > task.dueDate) {
      taskObj.dueTask.push(task);
    } else {
      taskObj.todoTask.push(task);
    }
  }

  taskObj.todoTask.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
  taskObj.completedTask.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
  taskObj.dueTask.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  return (
    <div className={styles.homeContainer}>
      <div className={styles.searchContainer}>
        <AutoComplete
          onSearch={onSearch}
          options={autoCompleteOptions.map((task) => renderItem(task))}
          style={{
            width: "100%",
          }}
          placeholder="Search Task"
          className={styles.autoComplete}
        />
      </div>
      <div className={styles.trayContainer}>
        {allTaskTray.map((taskTray, index) => {
          const tasks = taskObj[taskTray.taskListName];

          return (
            <TaskTray
              name={taskTray.name}
              showOptions={taskTray.showOptions}
              key={index}
            >
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={() => handleDeleteTask(task.id)}
                  updateTaskStatus={(status) => updateTaskStatus(task, status)}
                />
              ))}
            </TaskTray>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
