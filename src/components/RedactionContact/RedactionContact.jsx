import { Component } from "react";
import RedactionProp from "../RedactionProp/RedactionProp";
import styles from "./RedactionContact.module.css";

class RedactionContact extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    id: null,
  };

  componentDidUpdate(prevProps) {
    const { selectedContactId, selectedUser } = this.props;
    if (prevProps.selectedContactId === selectedContactId) return;
    if (selectedContactId === null) {
      this.resetForm();
      return;
    }
    if (selectedUser) {
      this.setState({ ...selectedUser });
    }
  }

  resetForm = () => {
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      id: null,
    });
  };

  handleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  };

  clearSelectInput = (fieldName) => {
    this.setState({ [fieldName]: "" });
  };

  render() {
    const { firstName, lastName, email, phone } = this.state;
    const { selectedContactId, deleteContact, saveContact } = this.props;
    return (
     

      <>
        <form className={styles["redaction-contact-div"]}>
          <RedactionProp
            name="firstName"
            placeholder="First Name"
            value={firstName}
            handleChange={this.handleChange}
            onClearInput={this.clearSelectInput}
          />

          <RedactionProp
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            handleChange={this.handleChange}
            onClearInput={this.clearSelectInput}
          />

          <RedactionProp
            name="email"
            placeholder="Email"
            value={email}
            handleChange={this.handleChange}
            onClearInput={this.clearSelectInput}
          />

          <RedactionProp
            name="phone"
            placeholder="Phone"
            value={phone}
            handleChange={this.handleChange}
            onClearInput={this.clearSelectInput}
          />
          <div className={styles["divSaveAndDelete"]}>
            <button type="button" onClick={() => saveContact(this.state)}>
              Save
            </button>
            {selectedContactId !== null && (
              <button
                type="button"
                onClick={() => deleteContact(selectedContactId)}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </>
    );
  }
}

export default RedactionContact;
