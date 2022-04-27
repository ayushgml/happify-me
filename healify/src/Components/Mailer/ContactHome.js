import React from "react";
import { Heading } from "./Heading";
import { UserList } from "./UserList";
import styles from "./Email.module.css";

export const ContactHome = ({ contacts, setContacts, sendEmail }) => {
  return (
    <div className={`${styles.contactsWrapper}`}>
      <Heading />
      <UserList
        contacts={contacts}
        setContacts={setContacts}
        sendEmail={sendEmail}
      />
    </div>
  );
};
export default ContactHome;
