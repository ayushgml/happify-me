import React, { useEffect, useState } from "react";
import EditTask from "../modals/EditTask";
import ConfirmDialog from "./ConfirmDialog";
import ViewModal from "../modals/ViewModal";
import styles from "./MilestonesHome.module.css";
import { NewReadMore } from "./NewReadMore";
const Card = ({ _id, taskObj, index, deleteTask, updateTask }) => {
  const [selected, setSelected] = useState(0);
  const { title, subtasks, targetDate, completed } = taskObj;

  useEffect(() => {
    const condn1 = subtasks.find((st) => !st.completed);
    const condn2 = subtasks.find((st) => st.completed);
    if (condn1 && condn2) {
      // partially complete
      setSelected(2);
    } else if (!condn1) {
      // all complete
      setSelected(1);
    } else {
      // all incomplete
      setSelected(0);
    }
  });

  const [modal, setModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const colors = [
    {
      primaryColor: "#FF0000",
      secondaryColor: "#FF0000",
    },
    {
      primaryColor: "#008000",
      secondaryColor: "#008000",
    },
    {
      primaryColor: "#FFA500",
      secondaryColor: "#FFA500",
    },
  ];

  const toggle = () => {
    setModal(!modal);
  };

  const handleDelete = () => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    deleteTask(index);
  };
  const saveTask = () => {
    setModal(false);
    updateTask();
  };
  return (
    <div className={styles["card-wrapper"]}>
      <div
        className={styles["card-top"]}
        style={{ "background-color": colors[selected].primaryColor }}
      >
        <div className={styles["task-holder"]}>
          <span
            className={styles["card-header"]}
            style={{
              "background-color": colors[selected].secondaryColor,
              "border-radius": "15px",
              color: "white",
            }}
          >
            {title}
          </span>

          <h6 className="mt-1">{targetDate}</h6>

          <NewReadMore subtasks={subtasks} />

          <br />
          <div style={{ position: "absolute", right: "20px", top: "200px" }}>
            <i
              class="far fa-edit  "
              style={{
                color: colors[selected].primaryColor,
                cursor: "pointer",
              }}
              onClick={() => setModal(true)}
            ></i>
          </div>

          <div style={{ position: "absolute", right: "50px", top: "200px" }}>
            <i
              class="fas fa-trash-alt"
              style={{
                color: colors[selected].primaryColor,
                cursor: "pointer",
              }}
              /*{onClick={handleDelete}}*/
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Are you sure to delete this task?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    handleDelete();
                  },
                });
              }}
            ></i>
          </div>
          <div
            onClick={() => {
              setViewModal(true);
            }}
          >
            <h6 className={`${styles.viewBtn}`}>Click here to View Task</h6>
          </div>

          {modal && (
            <EditTask
              _id={_id}
              modal={modal}
              toggle={toggle}
              taskObj={taskObj}
              save={saveTask}
              selected={selected}
              setSelected={setSelected}
            />
          )}
          {viewModal && (
            <ViewModal
              obj={taskObj}
              toggle={() => {
                setViewModal(!viewModal);
              }}
            />
          )}
        </div>
      </div>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  );
};
export default Card;
