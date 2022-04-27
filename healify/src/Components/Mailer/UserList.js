import React, { useEffect, useState } from "react";

import { ListGroup, ListGroupItem, Button } from "reactstrap";
import styles from "./Email.module.css";
import axios from "axios";
import ConfirmDialog from "../Milestones/ConfirmDialog";

export const UserList = ({ contacts, setContacts, sendEmail }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [confirmDialog, setConfirmDialog] = useState();
  const object = {
    isOpen: true,
    title: "Are you sure you want to Contact this Person",
    subTitle: "Click on yes to Proceed",
    onConfirm: (users) => {
      sendEmail(users);
      // history.push("/profile");
    },
  };
  const updateContacts = async () => {
    let allFriends;
    await axios
      .get("/api/v1/mailer/get-all-contacts", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        allFriends = res.data.data;
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.body);
        }
        allFriends = {};
      });

    setContacts(allFriends);
  };
  const removeUser = async (id) => {
    await axios
      .post(
        "/api/v1/mailer/remove-contact",
        {
          id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        updateContacts();
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
        }
      });
  };
  useEffect(() => {
    updateContacts();
  }, []);
  return contacts ? (
    <>
      <ListGroup className={`mt-5 ${styles.zeroMargin}`}>
        {contacts.length > 0 ? (
          <div>
            {contacts.map((users) => (
              <ListGroupItem
                key={users._id}
                className="d-flex"
                style={{ border: "0.25px solid black" }}
              >
                {/* <div style={{"flexDirection":"row"}}>
                        <div style={{"flexDirection":"column"}}> */}
                <strong>{users.name}</strong>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <h6>{users.email}</h6>
                {/* <p>bukkeroopa@gmail.com</p>  */}
                <div className="ml-auto">
                  {/* Add or remove a property based on selected */}
                  {/* <Button
                    color="warning"
                    onClick={() => {
                      sendEmail(users);
                    }}
                  >
                    Send Mail
                  </Button> */}
                  <Button
                    color="warning"
                    onClick={() => {
                      setConfirmDialog({ ...object, paramMail: users });
                    }}
                  >
                    Send Mail
                  </Button>
                  <Button onClick={() => removeUser(users._id)} color="danger">
                    Delete
                  </Button>
                </div>
              </ListGroupItem>
            ))}
          </div>
        ) : (
          <h3 className="text-center">No Contacts</h3>
        )}
      </ListGroup>
      {confirmDialog && confirmDialog.isOpen && (
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      )}
    </>
  ) : (
    <div>Empty</div>
  );
};
