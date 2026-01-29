import { Component } from "react";
// import { nanoid } from "nanoid";
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
    const { userContact, selectedContactId } = this.props;

    console.log("componentDidUpdate", this.state);

    console.log("selectedContactId", selectedContactId);
    console.log("prevProps.selectedContactId", prevProps.selectedContactId);
    console.log(
      "prevProps.selectedContactId !== selectedContactId",
      prevProps.selectedContactId !== selectedContactId,
    );
    if (prevProps.selectedContactId !== selectedContactId) {
      if (selectedContactId === null) {
        console.log("selectedContactId === null", selectedContactId === null);
        this.setState({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          id: null,
        });
      } else if (userContact) {
        console.log("userContact", userContact);
        this.setState({ ...userContact });
      }
    }
  }

  handleChange = (ev) => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
    console.log("handleChange", this.state);
  };

  render() {
    const { firstName, lastName, email, phone } = this.state;

    return (
      <>
        <form className={styles["redaction-contact-div"]}>
          <input
            name="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={this.handleChange}
          />
          <input
            name="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={this.handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
          <div className={styles.inputWrapper}>
            <input
              name="phone"
              placeholder="Phone"
              value={phone}
              onChange={this.handleChange}
            />

            {phone && (
              <span
                className={styles.clearX}
                onClick={() => this.setState({ phone: "" })}
              >
                ✕
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => this.props.saveContact(this.state)}
          >
            Save
          </button>
          {this.props.selectedContactId !== null && (
            <button type="button" onClick={() => this.props.deleteContact()}>
              Delete
            </button>
          )}
        </form>
      </>
    );
  }
}

export default RedactionContact;
