import { Component } from "react";
import styles from "./RedactionProp.module.css";

class RedactionProp extends Component {
  render() {
    const { name, value, placeholder, handleChange, onClearInput } = this.props;

    return (
      <div className={styles.inputWrapper}>
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />

        {value && (
          <span
            className={styles.clearX}
            onClick={() => onClearInput(name)}
          >
            ✕
          </span>
        )}
      </div>
    );
  }
}

export default RedactionProp;