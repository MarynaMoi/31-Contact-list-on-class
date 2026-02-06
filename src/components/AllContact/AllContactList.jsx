import { Component } from "react";
import styles from "./AllContactList.module.css";
import UserContact from "../UserContact/UserContact";
class AllContactList extends Component {
  render() {
    return (
      <div className={styles["all-contact-div"]}>
        {this.props.userContacts.map((item) => (
          <UserContact
            key={item.id}
            contact={item}
            selectContact={this.props.selectContact}
            deleteContact={this.props.deleteContact}
          />
        ))}
        <button
          className={styles["add-contact-btn"]}
          onClick={this.props.addNewContact}
        >
          New
        </button>
      </div>
    );
  }
}

export default AllContactList;
