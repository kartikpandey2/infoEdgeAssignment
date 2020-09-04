import React from "react";
import classNames from "classnames";
import styles from "./button.module.scss";

const Button = (props) => {
  const { type = "", className = "", ...rest } = props;
  let buttonClass = "";

  switch (type.toLowerCase()) {
    case "primary": {
      buttonClass = styles.primary;
      break;
    }

    case "primary-border": {
      buttonClass = styles.primaryBorder;
      break;
    }

    default: {
      break;
    }
  }

  return (
    <button
      className={classNames(buttonClass, className, styles.button)}
      {...rest}
    >
      {props.children}
    </button>
  );
};

export default Button;
