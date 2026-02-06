import { Component } from "react";
import RedactionProp from "../RedactionProp/RedactionProp";
import styles from "./ContactForm.module.css";

class ContactForm extends Component {
  state = {
    contact: this.props.contact,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.contact.id !== state.contact.id) {
      return {
        contact: props.contact,
      };
    }
    return null;
  }

  handleChange = (ev) => {
    const { name, value } = ev.target;

    this.setState((prev) => ({
      contact: {
        ...prev.contact,
        [name]: value,
      },
    }));
  };

  clearSelectInput = (fieldName) => {
    this.setState((prev) => ({
      contact: {
        ...prev.contact,
        [fieldName]: "",
      },
    }));
  };

  onSaveContact = (ev) => {
    ev.preventDefault();
    this.props.saveContact(this.state.contact);

    if (!this.state.contact.id) {
      this.setState({
        contact: this.props.createNewContact(),
      });
    } else {
      this.setState({
        contact: this.state.contact,
      });
    }
  };

  onDeleteContact = (ev) => {
    ev.preventDefault();

    this.props.deleteContact(this.state.contact.id);
  };

  render() {
    return (
      <>
        <form className={styles["redaction-contact-div"]}>
          <RedactionProp
            name="firstName"
            placeholder="First Name"
            value={this.state.contact.firstName}
            handleChange={this.handleChange}
            onClearInput={this.clearSelectInput}
          />

          <RedactionProp
            name="lastName"
            placeholder="Last Name"
            value={this.state.contact.lastName}
            handleChange={this.handleChange}
            onClearInput={this.clearSelectInput}
          />

          <RedactionProp
            name="email"
            placeholder="Email"
            value={this.state.contact.email}
            handleChange={this.handleChange}
            onClearInput={this.clearSelectInput}
          />

          <RedactionProp
            name="phone"
            placeholder="Phone"
            value={this.state.contact.phone}
            handleChange={this.handleChange}
            onClearInput={this.clearSelectInput}
          />
          <div className={styles["divSaveAndDelete"]}>
            <button onClick={this.onSaveContact}>Save</button>
            {this.props.contact.id !== null && (
              <button onClick={this.onDeleteContact}>Delete</button>
            )}
          </div>
        </form>
      </>
    );
  }
}

export default ContactForm;
