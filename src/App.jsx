import { Component } from "react";
import { nanoid } from "nanoid";
import styles from "./App.module.css";
import AllContactList from "./components/AllContact/AllContactList";
import ContactForm from "./components/ContactForm/ContactForm";

class App extends Component {
  state = {
    userContacts: [],
    selectedContact: this.createNewContact(),
  };

  componentDidMount() {
    this.getFromLocalStor();
  }

  getFromLocalStor() {
    const userData = JSON.parse(localStorage.getItem("userContacts"));
    if (userData) {
      this.setState({ userContacts: userData });
    }else{this.setState({ userContacts: [] })}
  }

  saveToLocalStor = () => {
    localStorage.setItem(
      "userContacts",
      JSON.stringify(this.state.userContacts),
    );
  };

  selectContact = (contact) => {
    this.setState({ selectedContact: contact });
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
    this.setState({ selectedContact: this.createNewContact() });
  };

  saveContact = (contact) => {
    if (!contact.id) {
      contact.id = nanoid();
      this.setState(
        (prev) => ({
          userContacts: [...prev.userContacts, contact],
          selectedContact: this.createNewContact(),
        }),
        this.saveToLocalStor,
      );
    } else {
      this.setState(
        (prev) => ({
          userContacts: prev.userContacts.map((item) =>
            item.id === contact.id ? contact : item,
          ),
        }),
        this.saveToLocalStor,
      );
    }
  };

  deleteContact = (id) => {
    this.setState(
      (prev) => ({
        userContacts: prev.userContacts.filter((item) => item.id !== id),
        selectedContact:
          prev.selectedContact.id === id
            ? this.createNewContact()
            : prev.selectedContact,
      }),
      this.saveToLocalStor,
    );
  };

  render() {
    return (
      <>
        <div className={styles["title"]}>Contact list</div>
        <div className={styles["list-and-redaction-div"]}>
          <AllContactList
            userContacts={this.state.userContacts}
            selectContact={this.selectContact}
            addNewContact={this.addNewContact}
            deleteContact={this.deleteContact}
          />
          <ContactForm
            saveContact={this.saveContact}
            contact={this.state.selectedContact}
            deleteContact={this.deleteContact}
            createNewContact={this.createNewContact}
          />
        </div>
      </>
    );
  }
}

export default App;
