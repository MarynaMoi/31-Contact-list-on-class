import { Component } from "react";
import { nanoid } from "nanoid";
import styles from "./App.module.css";
import AllContactList from "./components/AllContact/AllContactList";
import RedactionContact from "./components/RedactionContact/RedactionContact";

class App extends Component {
  state = {
    userContact: [],
    selectedContactId: null,
  };
  getFromLocalStor() {
    const userData = JSON.parse(localStorage.getItem("userContact"));
    if (userData) {
      this.setState({ userContact: userData });
    }
  }
  componentDidMount() {
    this.getFromLocalStor();
  }
  selectContactById = (id) => {
    this.setState({ selectedContactId: id });
  };

  clearSelectedContact = () => {
    this.setState({ selectedContactId: null });
  };

  saveToLocalStor = () => {
    localStorage.setItem("userContact", JSON.stringify(this.state.userContact));
  };

  saveContact = (contact) => {
    if (!contact.id) {
      const newContact = { ...contact, id: nanoid() };
      this.setState(
        (prev) => ({
          userContact: [...prev.userContact, newContact],
          selectedContactId: newContact.id,
        }),
        this.saveToLocalStor,
      );
    } else {
      console.log("saveOld")
      this.setState(
        (prev) => ({
          userContact: prev.userContact.map((u) =>
            u.id === contact.id ? contact : u,
          ),
        }),
        this.saveToLocalStor,
      );
    }
  };

  deleteContact = (id) => {
    this.setState(
      (prev) => ({
        userContact: prev.userContact.filter((u) => u.id !== id),
        selectedContactId:
          prev.selectedContactId === id ? null : prev.selectedContactId,
      }),
      this.saveToLocalStor,
    );
  };

  render() {
    const { userContact } = this.state;
    const selectedUser = userContact.find(
      (u) => u.id === this.state.selectedContactId,
    );
    return (
      <>
        <div className={styles["title"]}>Contact list</div>
        <div className={styles["list-and-redaction-div"]}>
          <AllContactList
            userContact={userContact}
            selectContactById={this.selectContactById}
            clearSelectedContact={this.clearSelectedContact}
            deleteContact={this.deleteContact}
          />
          <RedactionContact
            selectedUser={selectedUser}
            userContact={userContact}
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
