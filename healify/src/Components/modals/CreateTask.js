/* Modal For Creating Milestones */

import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import modalStyles from "./modal.module.css";
import axios from "axios";

const CreateTask = ({ modal, toggle, save }) => {
  const [titleName, setTitleName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // Trying to add Subtasks
  const [subtasks, setSubtasks] = useState([]);

  const subTaskHandle = (e) => {
    if (e.keyCode === 13 && e.target.name === "description") {
      if (!e.target.value) {
        setWarning("Sub Task Cannot be empty");
        setTimeout(() => {
          setWarning("");
        }, 2000);
        return;
      }
      const newSubTask = { content: `+ ${e.target.value}`, completed: false };
      setSubtasks((currentState) => {
        return [...currentState, newSubTask];
      });
      setDescription("");
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", subTaskHandle);
    return () => {
      window.removeEventListener("keyup", subTaskHandle);
    };
  }, []);

  // End of Subtasks
  const [warning, setWarning] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "titleName") {
      if (value.length <= 60) {
        setTitleName(value);
      }
    } else if (name === "description") {
      setDescription(value);
    } else {
      setDate(value);
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();
    if (!titleName || !date) {
      setWarning("Title and Date are required");
      setTimeout(() => {
        setWarning("");
      }, 2000);
      return;
    }

    if (!subtasks.length) {
      setWarning("Minimum One sub task is required");
      setTimeout(() => {
        setWarning("");
      }, 2000);
      return;
    }

    const targetDate = new Date(date);
    if (targetDate == "Invalid Date") {
      setWarning("Date is Invalid");
      setTimeout(() => {
        setWarning("");
      }, 2000);
      return;
    }
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      setWarning("Please Log in First");
      setTimeout(() => {
        setTitleName("");
        setDate("");
        setDescription("");
        setSubtasks([]);
        setWarning("");
        save();
      }, 2000);

      return;
    }
    await axios
      .post(
        "/api/v1/milestones/create",
        {
          title: titleName,
          targetDate,
          subtasks,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setTitleName("");
        setDate("");
        setDescription("");
        setSubtasks([]);
        save();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const resetForm = (e) => {
    e.preventDefault();
    setTitleName("");
    setDate("");
    setDescription("");
    setSubtasks([]);
    toggle();
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create New</ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group">
            <label>
              Title Name{" "}
              <span style={{ fontSize: "12px", fontWeight: "bolder" }}>
                {titleName.length}/60
              </span>
            </label>
            <input
              type="text"
              className="form-control"
              value={titleName}
              onChange={handleChange}
              name="titleName"
            />
          </div>
          <div className="form-group">
            <label>MM/DD/YYYY</label>
            <input
              type="text"
              className="form-control"
              value={date}
              onChange={handleChange}
              name="Date"
            />
          </div>

          <div className="form-group">
            <label>TaskList</label>
            {subtasks &&
              subtasks.map((each, index) => {
                return (
                  <h5
                    key={index}
                    id={index}
                    className={`${modalStyles.subtask}`}
                  >
                    {each.content}
                  </h5>
                );
              })}
            <input
              className="form-control"
              placeholder={"Press Enter Key to add new Subtask"}
              value={description}
              onChange={handleChange}
              name="description"
            ></input>
          </div>
        </form>

        {warning && <h5 className={modalStyles.warning}>{warning}</h5>}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Save
        </Button>{" "}
        <Button color="secondary" onClick={resetForm}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default CreateTask;
