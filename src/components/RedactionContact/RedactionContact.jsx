import { Component } from "react";
import RedactionProp from "../RedactionProp/RedactionProp";
import styles from "./RedactionContact.module.css";

class RedactionContact extends Component {
  state = { selectedContact: this.props.selectedContact };

  static getDerivedStateFromProps(props, state) {
    console.log(props.selectedContact.id, state.selectedContact.id);

    if (props.selectedContact.id !== state.selectedContact.id) {
      return {
        selectedContact: props.selectedContact,
      };
    }

    return null;
  }

  handleChange = (ev) => {
    const { name, value } = ev.target;

    this.setState((prevState) => ({
      selectedContact: {
        ...prevState.selectedContact,
        [name]: value,
      },
    }));
  };

  clearSelectInput = (fieldName) => {
    this.setState((prevState) => ({
      selectedContact: {
        ...prevState.selectedContact,
        [fieldName]: "",
      },
    }));
  };

  onSaveContact = () => {
    this.props.saveContact(this.state.selectedContact);
  };
  onDeleteContact = () => {
    this.props.deleteContact(this.state.selectedContact.id);
  };

  render() {
    return (
      <>
        <form className={styles["redaction-contact-div"]}>
          <RedactionProp
            name="firstName"
            placeholder="First Name"
            value={this.state.selectedContact.firstName}
            handleChange={this.handleChange}
            onClearInput={this.clearSelectInput}
          />

          <RedactionProp
            name="lastName"
            placeholder="Last Name"
            value={this.state.selectedContact.lastName}
            handleChange={this.handleChange}
            onClearInput={this.clearSelectInput}
          />

          <RedactionProp
            name="email"
            placeholder="Email"
            value={this.state.selectedContact.email}
            handleChange={this.handleChange}
            onClearInput={this.clearSelectInput}
          />

          <RedactionProp
            name="phone"
            placeholder="Phone"
            value={this.state.selectedContact.phone}
            handleChange={this.handleChange}
            onClearInput={this.clearSelectInput}
          />
          <div className={styles["divSaveAndDelete"]}>
            <button type="button" onClick={this.onSaveContact}>
              Save
            </button>
            {this.props.selectedContact.id !== null && (
              <button type="button" onClick={this.onDeleteContact}>
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
