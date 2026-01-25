import { Component } from "react";
import styles from "./App.module.css";
import Header from "../components/Header/Header";
import AllContactList from "../components/AllContact/AllContactList";
import RedactionContact from "../components/RedactionContact/RedactionContact";

class App extends Component {
  state = {
    userContact: [
      { id: 1, firstName: "fN1", lastName: "lN1", email: '1@1', phone: '111' },
      { id: 2, firstName: "fN2", lastName: "lN2", email: '2@2', phone: '222' },
      { id: 3, firstName: "fN3", lastName: "lN3", email: '3@3', phone: '333' },
    ],
  };
  render() {
    const { userContact } = this.state;
    return (
      <>
        <Header />
        <div className={styles["list-and-redaction-div"]}>
          <AllContactList userContact={userContact} />
          <RedactionContact />
        </div>
      </>
    );
  }
}

export default App;
