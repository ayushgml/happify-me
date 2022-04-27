/* Modal For Creating Reviews */

import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import modalStyles from "./modal.module.css";
import axios from "axios";

export const CreateReview = ({ modal, toggle, eventId }) => {
  // End of Subtasks
  const [review, setReview] = useState("");
  const [warning, setWarning] = useState("");

  const displayWarning = async (msg) => {
    setWarning(msg);
    setTimeout(() => {
      setWarning("");
    }, 3000);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    let accepted = true;
    if (!review) {
      displayWarning("Review cannot be empty");
      return;
    }
    const token = JSON.parse(localStorage.getItem("token"));

    await axios
      .post(
        "/api/v1/events/reviews",
        {
          content: review,
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
          console.log(err.response);
          if (err.response.data.msg) {
            displayWarning(err.response.data.msg);
            accepted = false;
          }
        }
      });
    if (accepted) {
      toggle();
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create New</ModalHeader>
      <ModalBody>
        <label className="form-control" htmlFor="review">
          Add New Review Here
        </label>
        <textarea
          type="text"
          rows="4"
          onChange={(e) => {
            setReview(e.target.value);
          }}
          className="form-control"
          value={review}
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
            setReview("");
            toggle();
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
