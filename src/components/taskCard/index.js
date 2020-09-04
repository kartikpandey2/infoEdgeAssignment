import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Tag } from "antd";
import { timeToDayCount } from "../../utils";
import styles from "./taskCard.module.scss";

const dueTaskColor = ["#a80101", "#cc4e42", "#e9847e"];
const normalTaskColor = ["#87d068", "#87d068", "#87d068", "#87d068"];

const TaskCard = (props) => {
  const { task, onDelete, updateTaskStatus } = props;

  const menu =
    task.status === "OPEN" ? (
      <Menu>
        <Menu.Item>
          <Link to={`/update/${task.id}`}>Edit</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <div onClick={() => updateTaskStatus("COMPLETED")}>Mark Complete</div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <div onClick={onDelete}>Delete</div>
        </Menu.Item>
      </Menu>
    ) : (
      <Menu>
        <Menu.Item>
          <div onClick={() => updateTaskStatus("OPEN")}>Mark Open</div>
        </Menu.Item>
        <Menu.Item>
          <div onClick={onDelete}>Delete</div>
        </Menu.Item>
      </Menu>
    );

  let priorityColor;

  switch (task.priority) {
    case "low": {
      priorityColor = "cyan";
      break;
    }

    case "medium": {
      priorityColor = "orange";
      break;
    }

    case "high": {
      priorityColor = "volcano";
      break;
    }

    default: {
      break;
    }
  }

  const daysToTaskDue = timeToDayCount(task.dueDate - Date.now());

  return (
    <div className={styles.taskCardContainer}>
      {task.status === "OPEN" ? (
        <div className={styles.dueTaskHighliterContainer}>
          {daysToTaskDue < 3 ? (
            <div>
              {dueTaskColor.slice(0, daysToTaskDue + 1).map((color, index) => (
                <span
                  key={index}
                  style={{ background: color }}
                  className={styles.dueTaskHighliter}
                />
              ))}
            </div>
          ) : (
            <div>
              {normalTaskColor.map((color, index) => (
                <span
                  key={index}
                  style={{ background: color }}
                  className={styles.dueTaskHighliter}
                />
              ))}
            </div>
          )}
          <Dropdown
            overlay={menu}
            placement="bottomRight"
            arrow
            trigger={["click"]}
          >
            <button className="iconButton">
              <span className="optionsIcon">...</span>
            </button>
          </Dropdown>
        </div>
      ) : null}
      <div className={styles.titleContainer}>
        <div className={styles.taskTitle}>
          <Link to={`/${task.id}`}>{task.name} </Link>
        </div>

        {task.status === "COMPLETED" ? (
          <Dropdown
            overlay={menu}
            placement="bottomRight"
            arrow
            trigger={["click"]}
          >
            <button className="iconButton">
              <span className="optionsIcon">...</span>
            </button>
          </Dropdown>
        ) : null}
      </div>
      <p className={styles.description}>
        {task.description ? task.description : "No description provided."}
      </p>
      <Tag color={priorityColor}>{task.priority.toUpperCase()}</Tag>
    </div>
  );
};

export default TaskCard;
