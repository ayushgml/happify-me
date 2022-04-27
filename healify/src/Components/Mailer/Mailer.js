import React from "react";
import { Header } from "../Home/Header";
import emailjs from "emailjs-com";
import axios from "axios";
import { Email } from "./Email";
import ContactHome from "./ContactHome";
import styles from "./Email.module.css";

import { MessageBody } from "./MessageTemplates";

import { useState, useEffect } from "react";
export const Mailer = () => {
  const [messageTemplate, setMessageTemplate] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState("default");

  useEffect(() => {
    const asyncWrapper = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      await axios
        .get("/api/v1/", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const { username } = res.data.data;
          setUser(username);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    asyncWrapper();
  }, []);

  const sendEmail = async (contact) => {
    const templateObject = {
      from_name: user,
      recipient_email: contact.email,
      to_name: contact.name,
      message: MessageBody[messageTemplate],
    };

    await emailjs
      .send(
        "service_e630rg9",
        "template_k8pk08h",
        templateObject,
        "user_qWGvWJS0Y3RuCm6dL7cXk"
      )
      .then(
        (result) => {
          alert("Your message has been sent successfully ! 👍");
        },
        (error) => {
          alert(error.message);
        }
      );
  };

  return (
    <>
      <Header />

      <div className={`${styles.wrapperDiv}`}>
        <Email
          maxLimit={MessageBody.length}
          message={MessageBody[messageTemplate]}
          messageTemplate={messageTemplate}
          setMessageTemplate={setMessageTemplate}
        />
        <ContactHome
          contacts={contacts}
          setContacts={setContacts}
          sendEmail={sendEmail}
        />
      </div>
    </>
  );
};

export default Mailer;
