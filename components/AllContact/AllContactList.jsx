import { Component } from "react";
import styles from "./AllContactList.module.css";
import UserContact from "../UserContact/UserContact";
class AllContactList extends Component {
  render() {
    const { userContact, selectedContact, startAddContact, deleteContact} = this.props;
    return (
      <div className={styles["all-contact-div"]}>
        {userContact.map((u) => (
          <UserContact
            key={u.id}
            userContact={u}
            selectedContact={selectedContact}
            deleteContact={deleteContact}
          />
        ))}
        <button className={styles["add-contact-btn"]} onClick={startAddContact}>
          New
        </button>
      </div>
    );
  }
}

export default AllContactList;
