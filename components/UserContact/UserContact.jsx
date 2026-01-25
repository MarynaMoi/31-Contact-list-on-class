import { Component } from "react";
import styles from "./UserContact.module.css";
export class UserContact extends Component {
  render() {
    const { id, lastName, firstName } = this.props.userContact;
    return (
      <div className={styles["user-contact"]}>
        <div>
          {firstName} {lastName}
        </div>
      </div>
    );
  }
}

export default UserContact;
