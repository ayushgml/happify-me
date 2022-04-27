/* Modal For Viewing Milestones */

import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import modalStyles from "./modal.module.css";

const CreateTask = ({ obj, toggle }) => {
  return (
    <Modal isOpen={true} toggle={toggle}>
      <ModalHeader toggle={toggle}>See Your Milestone Below</ModalHeader>
      <ModalBody>
        <section className={`${modalStyles.font}`}>
          <h3 className={`${modalStyles.heading}`}>Title</h3>
          <h3>{obj.title}</h3>
          <h3 className={`${modalStyles.heading}`}>Target Date</h3>
          <h3>{obj.targetDate}</h3>
          <h3 className={`${modalStyles.heading}`}>subtasks</h3>
          {obj.subtasks.map((each) => {
            return (
              <h3 className={`${each.completed ? modalStyles.completed : ""}`}>
                {each.content}
              </h3>
            );
          })}
        </section>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Exit
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default CreateTask;
