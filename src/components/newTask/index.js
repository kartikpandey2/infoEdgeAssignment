import React, { Component } from "react";
import moment from "moment";
import { notification, Select, DatePicker, Input } from "antd";
import Button from "../button";
import { addTask, updateTask } from "../../utils/task";
import styles from "./newTask.module.scss";

const { Option } = Select;
const { TextArea } = Input;

const showNotification = (message) => {
  notification.success({
    message,
  });
};

class NewTask extends Component {
  state = {
    name: "",
    description: "",
    priority: "low",
    dueDate: Date.now(),
  };

  componentDidMount() {
    const { update, task, readOnly } = this.props;

    if (update || readOnly) {
      this.setState({
        name: task.name,
        description: task.description,
        priority: task.priority,
        dueDate: task.dueDate,
      });
    }
  }

  validateTaskData = () => {
    const { name, dueDate } = this.state;
    const obj = { value: true, err: null };

    if (!name) {
      obj.value = false;
      obj.err = "Name field cannot be empty";

      return obj;
    }

    if (!dueDate) {
      obj.value = false;
      obj.err = "Due field cannot be empty";

      return obj;
    }

    return obj;
  };

  addTask = () => {
    const { name, description, priority, dueDate } = this.state;
    const isValidData = this.validateTaskData();

    if (isValidData.value) {
      const taskData = {
        name,
        description,
        priority,
        dueDate,
      };

      addTask(taskData);
      showNotification("Task Added");
      this.props.onAdd();
    } else {
      console.log(isValidData.err);
    }
  };

  updateTask = () => {
    const { name, description, priority, dueDate } = this.state;
    const isValidData = this.validateTaskData();

    if (isValidData.value) {
      const taskData = {
        ...this.props.task,
        name,
        description,
        priority,
        dueDate,
      };

      updateTask(this.props.task.id, taskData);
      showNotification("Task Updated");
      this.props.onUpdate();
    } else {
      console.log(isValidData.err);
    }
  };

  disabledDate = (current) => {
    const todayDate = new Date().setHours(0, 0, 0, 0);

    if (current.valueOf() < todayDate) {
      return true;
    }

    return false;
  };

  render() {
    const { name, description, priority, dueDate } = this.state;
    const { readOnly, update } = this.props;

    return (
      <div className={styles.newTaskContainer}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Name</label>
          <Input
            onChange={(e) => this.setState({ name: e.target.value })}
            value={name}
            readOnly={readOnly}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Description</label>
          <TextArea
            rows={4}
            onChange={(e) => this.setState({ description: e.target.value })}
            value={description}
            readOnly={readOnly}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Priority</label>
          <Select
            onChange={(value) => this.setState({ priority: value })}
            value={priority}
            style={{ width: 120 }}
            disabled={readOnly}
          >
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Due Date</label>
          <DatePicker
            type="date"
            onChange={(_date, dateString) =>
              this.setState({ dueDate: moment(dateString).valueOf() })
            }
            value={moment(dueDate)}
            disabledDate={this.disabledDate}
            disabled={readOnly}
          />
        </div>
        {!readOnly ? (
          <div className={styles.inputContainer}>
            {update ? (
              <Button type="primary" onClick={this.updateTask}>
                Update Task
              </Button>
            ) : (
              <Button type="primary" onClick={this.addTask}>
                Create Task
              </Button>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export default NewTask;
