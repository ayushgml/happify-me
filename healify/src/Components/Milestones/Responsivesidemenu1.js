import React, { useState } from "react";
import CreateTask from "../modals/CreateTask";
import styles from "./ResponsiveSidemenu1.module.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
export const Responsivesidemenu1 = ({
  createTask,
  notifications,
  missed,
  setNotifPage,
  setMissPage,
  totalTasks,
}) => {
  const history = useHistory();
  const [modal, setModal] = useState(false);
  // const [taskList, setTaskList] = useState([]);
  const toggle = () => setModal(!modal);
  const saveTask = () => {
    createTask();
    setModal(false);
  };
  return (
    <div className={styles.mybody}>
      <div className={styles["main-menu"]}>
        <br />
        <br />
        <br />
        <br />
        <ul>
          <li
            className={styles["menu-item"]}
            onClick={() => {
              setNotifPage(false);
              setMissPage(false);
              history.replace("/MilestonesHome");
            }}
          >
            {" "}
            <i class="fas fa-home"></i> &nbsp;&nbsp; &nbsp;&nbsp;Home (
            {totalTasks})
          </li>
          <Link to="/About">
            <li className={styles["menu-item"]}>
              {" "}
              <i className="fa fa-question-circle"></i>&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;About
            </li>
          </Link>
          {/* <Link to="/Timeline">
            <li className={styles["menu-item"]}>
              <i class="fas fa-list-alt"></i>&nbsp; &nbsp;&nbsp;Achievements
            </li>
          </Link> */}

          <li className={styles["menu-item"]} onClick={() => setModal(true)}>
            <i class="fas fa-pencil"></i>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;Create
            New
          </li>
          <li
            className={styles["menu-item"]}
            onClick={() => {
              setNotifPage(true);
              setMissPage(false);
              history.replace("/Notifications");
            }}
          >
            <i class="fas fa-bell"></i>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <span>Upcoming ({notifications})</span>
          </li>

          <li
            className={styles["menu-item"]}
            onClick={() => {
              setNotifPage(false);
              setMissPage(true);
              history.replace("/Missed");
            }}
          >
            <i class="fas fa-bell"></i>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
            <span>Missed ({missed})</span>
          </li>
        </ul>
      </div>
      <CreateTask toggle={toggle} modal={modal} save={saveTask} />
    </div>
  );
};
