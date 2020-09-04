import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import styles from "./taskTray.module.scss";

const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        Mark All Complete
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Delete All
      </a>
    </Menu.Item>
  </Menu>
);

const TaskTray = (props) => {
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
