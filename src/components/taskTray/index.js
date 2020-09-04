import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import styles from "./taskTray.module.scss";

const TaskTray = (props) => {
  const { deleteAll, updateMany } = props;

  const menu = (
    <Menu>
      <Menu.Item>
        <div onClick={() => updateMany("COMPLETED")}>Mark All Complete</div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <div onClick={deleteAll}>Delete All</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.taskTrayContainer}>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>{props.name}</div>
        {props.showOptions ? (
          <div>
            <Link to="/add">
              <button className="iconButton">
                <span className="addIcon">+</span>
              </button>
            </Link>
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
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default TaskTray;
