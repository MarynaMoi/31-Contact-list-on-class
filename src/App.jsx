import { Component } from "react";
import { nanoid } from "nanoid";
import styles from "./App.module.css";
import AllContactList from "./components/AllContact/AllContactList";
import RedactionContact from "./components/RedactionContact/RedactionContact";

class App extends Component {
  state = {
    userContact: [],
    selectedContact: this.createNewContact(),
  };

  componentDidMount() {
    this.getFromLocalStor();
  }

  getFromLocalStor() {
    const userData = JSON.parse(localStorage.getItem("userContact"));
    if (userData) {
      this.setState({ userContact: userData });
    }
  }

  saveToLocalStor = () => {
    localStorage.setItem("userContact", JSON.stringify(this.state.userContact));
  };

  selectContact = (contact) => {
    this.setState({ selectedContact: contact }, () => {});
  };

  createNewContact() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      id: null,
    };
  }

  addNewContact = () => {
    this.setState({ selectedContact: this.createNewContact() }, () => {});
  };

  saveContact = (contact) => {
    if (!contact.id) {
      // contact.id = nanoid();
      const newContact = { ...contact, id: nanoid() };
      this.setState(
        (prev) => ({
          userContact: [...prev.userContact, newContact],
          selectedContact: this.createNewContact(), 
        }),
        this.saveToLocalStor,
      );
    } else {
      console.log("saveOld");
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
        selectedContact:
          prev.selectedContact.id === id
            ? this.createNewContact()
            : prev.selectedContact,
      }),
      this.saveToLocalStor,
    );
  };

  render() {
    // console.log(this.state.selectedContact);
    return (
      <>
        <div className={styles["title"]}>Contact list</div>
        <div className={styles["list-and-redaction-div"]}>
          <AllContactList
            userContact={this.state.userContact}
            selectContact={this.selectContact}
            addNewContact={this.addNewContact}
            deleteContact={this.deleteContact}
          />
          <RedactionContact
            saveContact={this.saveContact}
            selectedContact={this.state.selectedContact}
            deleteContact={this.deleteContact}
          />
        </div>
      </>
    );
  }
}

export default App;
