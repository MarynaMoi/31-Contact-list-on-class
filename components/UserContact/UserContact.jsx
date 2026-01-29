import { Component } from "react";
import styles from "./UserContact.module.css";
class UserContact extends Component {
  render() {
    const { id, lastName, firstName } = this.props.userContact;
    const selectedContact = this.props.selectedContact;
    return (
      <div className={styles["user-contact"]}>
        <div onClick={() => selectedContact(id)}>
          {firstName} {lastName} <span>X</span>
        </div>
      </div>
    );
  }
}

export default UserContact;
