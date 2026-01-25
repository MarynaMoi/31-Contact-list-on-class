import { Component } from "react";
import styles from "./AllContactList.module.css";
import UserContact from "../UserContact/UserContact";
export class AllContactList extends Component {
  render() {
    const userContact = this.props.userContact;
    return (
      <div className={styles["all-contact-div"]}>
        <h3>All Contact</h3>

        {userContact.map((c) => (
          <UserContact key={c.id} userContact={c} />
        ))}
      </div>
    );
  }
}

export default AllContactList;
