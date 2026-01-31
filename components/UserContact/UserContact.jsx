import { Component } from "react";
import styles from "./UserContact.module.css";
class UserContact extends Component {
  render() {
    const { id, lastName, firstName } = this.props.userContact;
    const { selectedContact, deleteContact } = this.props;
    return (
      <div className={styles["user-contact"]}>
        <div onClick={() => selectedContact(id)}>
          {firstName} {lastName}
          <span
            className={styles.deleteX}
            onClick={(ev) => {
              ev.stopPropagation();
              deleteContact(id);
            }}
          >
            X
          </span>
        </div>
      </div>
    );
  }
}

export default UserContact;
