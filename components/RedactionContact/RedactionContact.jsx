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
    const { selectedContactId, userContact } = this.props;
    if (prevProps.selectedContactId === selectedContactId) return;
    if (selectedContactId === null) {
      this.resetForm();
      return;
    }
    if (userContact) {
      this.setState({ ...userContact });
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
    const { selectedContactId } = this.props;

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

          <button
            type="button"
            onClick={() => this.props.saveContact(this.state)}
          >
            Save
          </button>
          {this.props.selectedContactId !== null && (
            <button
              type="button"
              onClick={() => this.props.deleteContact(selectedContactId)}
            >
              Delete
            </button>
          )}
        </form>
      </>
    );
  }
}

export default RedactionContact;
