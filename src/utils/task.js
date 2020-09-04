export const addTask = (task) => {
  const taskData = {
    ...task,
    createdOn: Date.now(),
    id: Date.now(),
    status: "OPEN",
  };
  const taskList = getTask();

  taskList.push(taskData);
  localStorage.setItem("tasks", JSON.stringify(taskList));
};

export const getTask = () => {
  let taskList = localStorage.getItem("tasks");

  if (taskList) {
    taskList = JSON.parse(taskList);
  } else {
    taskList = [];
  }

  return taskList;
};

export const getTaskById = (taskId) => {
  taskId = parseInt(taskId);
  const taskList = getTask();

  const t = taskList.filter((task) => task.id === taskId)[0];
  return t;
};

export const deleteTask = (taskId) => {
  const taskList = getTask();
  const newTaskList = taskList.filter((task) => task.id !== taskId);

  localStorage.setItem("tasks", JSON.stringify(newTaskList));
};

export const updateTask = (taskId, updatedData) => {
  const taskList = getTask();
  const newTaskList = taskList.map((task) => {
    if (task.id === taskId) {
      return updatedData;
    }

    return task;
  });

  localStorage.setItem("tasks", JSON.stringify(newTaskList));
};
