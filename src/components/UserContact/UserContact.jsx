import { Component } from "react";
import styles from "./UserContact.module.css";
class UserContact extends Component {
  onDeleteContact = (ev) => {
    ev.stopPropagation();
    this.props.deleteContact(this.props.userContact.id);
  };
  onSelectContact = (ev) => {
    ev.stopPropagation();
    this.props.selectContact(this.props.userContact);
  };

  render() {
    return (
      <div className={styles["user-contact"]}>
        <div onClick={this.onSelectContact}>
          {this.props.userContact.firstName} {this.props.userContact.lastName}
          <span className={styles.deleteX} onClick={this.onDeleteContact}>
            X
          </span>
        </div>
      </div>
    );
  }
}

export default UserContact;
