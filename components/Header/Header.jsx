import { Component } from "react";
import styles from "./Header.module.css";
export class Header extends Component {
  render() {
    return <div className={styles["contact-list"]}>Contact list</div>;
  }
}

export default Header;
