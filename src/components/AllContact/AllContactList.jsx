import { Component } from "react";
import styles from "./AllContactList.module.css";
import UserContact from "../UserContact/UserContact";
class AllContactList extends Component {
  render() {
    const { userContact, selectContactById, clearSelectedContact, deleteContact} = this.props;
    return (
      <div className={styles["all-contact-div"]}>
        {userContact.map((u) => (
          <UserContact
            key={u.id}
            userContact={u}
            selectContactById={selectContactById}
            deleteContact={deleteContact}
          />
        ))}
        <button className={styles["add-contact-btn"]} onClick={clearSelectedContact}>
          New
        </button>
      </div>
    );
  }
}

export default AllContactList;
