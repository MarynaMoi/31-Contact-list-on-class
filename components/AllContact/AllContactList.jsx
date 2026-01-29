import { Component } from "react";
import styles from "./AllContactList.module.css";
import UserContact from "../UserContact/UserContact";
class AllContactList extends Component {
  render() {
    const { userContact, selectedContact, startAddContact } = this.props;
    return (
      <div className={styles["all-contact-div"]}>
        <h3>All Contact</h3>

        {userContact.map((c) => (
          <UserContact
            key={c.id}
            userContact={c}
            selectedContact={selectedContact}
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
