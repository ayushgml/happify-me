/* Modal For Editing Milestones */

import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import modalStyles from "./modal.module.css";
const month_map = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

export const EditTask = ({ _id, modal, toggle, taskObj, save }) => {
  const [titleName, setTitleName] = useState(taskObj.title);
  const [date, setDate] = useState(taskObj.targetDate);
  const [description, setDescription] = useState();

  const [subtasks, setSubtasks] = useState(taskObj.subtasks);

  const subTaskHandle = (e) => {
    // state value for description not working here for some reason

    if (e.keyCode === 13 && e.target.name === `newSubTask${_id}`) {
      if (!e.target.value) {
        setWarning("Sub Task Cannot be empty");
        setTimeout(() => {
          setWarning("");
        }, 2000);
        return;
      }
      const newSubTask = { content: `+ ${e.target.value}`, completed: false };
      // This is updating for every single person
      // Overcame by using specific name for form based on ID
      setSubtasks((currentState) => {
        return [...currentState, newSubTask];
      });
      setDescription("");
    }
  };

  const toggleSubTask = (e) => {
    e.preventDefault();
    const newSubtasks = subtasks.map((each, index) => {
      if (index.toString() === e.target.id) {
        return { ...each, completed: !each.completed };
      }
      return each;
    });
    setSubtasks(newSubtasks);
  };

  useEffect(() => {
    window.addEventListener("keyup", subTaskHandle);
    return () => {
      window.removeEventListener("keyup", subTaskHandle);
    };
  }, []);

  const [warning, setWarning] = useState("");
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "titleName") {
      setTitleName(value);
    } else if (name === `newSubTask${_id}`) {
      setDescription(value);
    } else {
      setDate(value);
    }
  };

  const handleDelete = async (id) => {
    const newSubtasks = await subtasks.filter((each, index) => {
      return index.toString() !== id.toString();
    });
    setSubtasks(newSubtasks);
  };
  useEffect(() => {
    const arr = taskObj.targetDate.split(" ");
    const dateStr = `${month_map[arr[1]]}/${arr[2]}/${arr[3]}`;

    setDate(dateStr);
  }, []);

  const handleUpdate = async (e) => {
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

    await axios
      .patch(
        "/api/v1/milestones/edit",
        {
          milestoneId: _id,
          title: titleName,
          targetDate,
          description,
          subtasks,
          completed: false,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        save();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Task</ModalHeader>
      <ModalBody>
        <form>
          <div className="form-group">
            <label>Title Name</label>
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
                    className={`${modalStyles.subtask} ${
                      each.completed && modalStyles.completed
                    }`}
                    onClick={toggleSubTask}
                  >
                    {/* <div
                      style={{
                        position: "absolute",
                        right: "25px",
                        cursor: "pointer",
                      }}
                    >
                      <i className="far fa-edit "></i>
                    </div> */}
                    <div
                      style={{
                        position: "absolute",
                        right: "25px",
                        cursor: "pointer",
                      }}
                    >
                      <i
                        className="far fa-trash-alt"
                        onClick={() => {
                          handleDelete(index);
                        }}
                      ></i>
                    </div>
                    {each.content}
                  </h5>
                );
              })}
            <input
              className="form-control"
              value={description}
              onChange={handleChange}
              name={`newSubTask${_id}`}
              placeholder={"add a new Subtask"}
            ></input>
          </div>
        </form>

        {warning && <h5 className={modalStyles.warning}>{warning}</h5>}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleUpdate}>
          Update
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};
export default EditTask;
