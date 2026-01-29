import { Component } from "react";
import { nanoid } from "nanoid";
import styles from "./App.module.css";
import AllContactList from "../components/AllContact/AllContactList";
import RedactionContact from "../components/RedactionContact/RedactionContact";
const userData = [
  { id: 1, firstName: "fN1", lastName: "lN1", email: "1@1", phone: "111" },
  { id: 2, firstName: "fN2", lastName: "lN2", email: "2@2", phone: "222" },
  { id: 3, firstName: "fN3", lastName: "lN3", email: "3@3", phone: "333" },
];
class App extends Component {
  state = {
    userContact: userData,
    selectedContactId: null,
    // nemoUser: { id: null, firstName: "", lastName: "", email: "", phone: "" },
  };

  selectedContact = (id) => {
    this.setState({ selectedContactId: id });
    // console.log("selectedContact");
  };

  startAddContact = () => {
    this.setState({ selectedContactId: null });
    console.log("startAddContact");
  };

  saveContact = (contact) => {
    if (!contact.id) {
      // console.log("saveNewContact");
      const newContact = { ...contact, id: nanoid() };
      this.setState((prev) => ({
        userContact: [...prev.userContact, newContact],
        selectedContactId: newContact.id,
      }));
    } else {
      // console.log("savePrevContact");
      this.setState((prev) => ({
        userContact: prev.userContact.map((user) =>
          user.id === contact.id ? contact : user,
        ),
      }));
    }
  };

  deleteContact = () => {
    this.setState({
      userContact: [
        ...this.state.userContact.filter(
          (u) => u.id !== this.state.selectedContactId,
        ),
      ],
      selectedContactId: null
    });
  };

  render() {
    const { userContact } = this.state;
    const selectedUser = userContact.find(
      (u) => u.id === this.state.selectedContactId,
    );
    return (
      <>
        {/* <div className={styles["title"]}>Contact list</div> */}
        <div className={styles["list-and-redaction-div"]}>
          <AllContactList
            userContact={userContact}
            selectedContact={this.selectedContact}
            startAddContact={this.startAddContact}
          />
          <RedactionContact
            userContact={selectedUser}
            saveContact={this.saveContact}
            selectedContactId={this.state.selectedContactId}
            deleteContact={this.deleteContact}
          />
        </div>
      </>
    );
  }
}

export default App;
