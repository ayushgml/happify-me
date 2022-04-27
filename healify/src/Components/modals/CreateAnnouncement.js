/* Modal For Creating Announcements */

import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import modalStyles from "./modal.module.css";
import axios from "axios";

export const CreateAnnouncement = ({ modal, toggle, eventId }) => {
  // End of Subtasks
  const [announcement, setAnnouncement] = useState("");
  const [warning, setWarning] = useState("");

  const displayWarning = async (msg) => {
    setWarning(msg);
    setTimeout(() => {
      setWarning("");
    }, 3000);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!announcement) {
      displayWarning("Announcement cannot be empty");
      return;
    }
    const token = JSON.parse(localStorage.getItem("token"));

    await axios
      .post(
        "/api/v1/organizer/announcements",
        {
          content: announcement,
          eventId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        if (err.response) {
          console.log(err.response.body);
        }
      });
    toggle();
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create New</ModalHeader>
      <ModalBody>
        <label className="form-control" htmlFor="announcement">
          Add New Announcement Here
        </label>
        <input
          type="text"
          onChange={(e) => {
            setAnnouncement(e.target.value);
          }}
          className="form-control"
          value={announcement}
        />
        {warning && <h5 className={modalStyles.warning}>{warning}</h5>}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>{" "}
        <Button
          color="secondary"
          onClick={() => {
            setAnnouncement("");
            toggle();
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
