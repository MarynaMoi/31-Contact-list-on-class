import { Component } from "react";
import styles from "./UserContact.module.css";
class UserContact extends Component {
  onDeleteContact = (ev) => {
    ev.stopPropagation();
    this.props.deleteContact(this.props.contact.id);
  };
  onSelectContact = (ev) => {
    ev.stopPropagation();
    this.props.selectContact(this.props.contact);
  };

  render() {
    return (
      <div className={styles["user-contact"]}>
        <div onDoubleClick={this.onSelectContact}>
          {this.props.contact.firstName} {this.props.contact.lastName}
          <span className={styles.deleteX} onClick={this.onDeleteContact}>
            X
          </span>
        </div>
      </div>
    );
  }
}

export default UserContact;
