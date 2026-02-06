import { Component } from "react";
import styles from "./AllContactList.module.css";
import UserContact from "../UserContact/UserContact";
class AllContactList extends Component {
  render() {
    const { userContact, addNewContact, deleteContact, selectContact} = this.props;
    console.log(userContact)
    return (
      <div className={styles["all-contact-div"]}>
        {userContact.map((u) => (
          <UserContact
            key={u.id}
            userContact={u}
            selectContact={selectContact}
            deleteContact={deleteContact}
          />
        ))}
        <button className={styles["add-contact-btn"]} onClick={addNewContact}>
          New
        </button>
      </div>
    );
  }
}

export default AllContactList;
