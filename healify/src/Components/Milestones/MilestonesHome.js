import React, { useEffect, useState } from "react";

import Card from "./Card";

import styles from "./MilestonesHome.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Responsivesidemenu1 } from "./Responsivesidemenu1";
import axios from "axios";
import { Header } from "../Home/Header";

export const MilestonesHome = ({ notificationPage, missedPage }) => {
  const [taskList, setTaskList] = useState([]);
  const [notifications, setNotifications] = useState(0);
  const [missed, setMissed] = useState(0);
  const [notifPage, setNotifPage] = useState(notificationPage);
  const [missPage, setMissPage] = useState(missedPage);
  const [totalTasks, setTotalTasks] = useState(0);

  const updatePage = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    await axios
      .get("/api/v1/milestones", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const activeMilestones = res.data.data;
        setMissed(() => 0);
        setNotifications(() => 0);
        setTotalTasks(() => activeMilestones.length);
        const newActiveMilestones = activeMilestones.map((each) => {
          // For some reason db is inserting previous day -> default time == midnight issue??
          // Are mongoose and js considering 00 time as different days??
          let upcoming = false;
          // But this method is returning value to proper date
          let newDate = new Date(each.targetDate);

          // Date Comparison Logic to be done Here
          // We are checking next Seven Days

          // ------------------------------------------- //

          const seventhDay = new Date(Date.now());
          seventhDay.setDate(seventhDay.getDate() + 7);
          upcoming = newDate > Date.now() && newDate < seventhDay;

          // ------------------------------------------- //
          if (upcoming) {
            setNotifications((prev) => prev + 1);
          }

          const condn1 = each.subtasks.find((st) => !st.completed);
          let completed;
          if (condn1) {
            completed = false;
          } else {
            completed = true;
          }
          const isMissed = newDate < Date.now() && !completed;

          newDate = newDate.toString().slice(0, 15);
          if (isMissed) {
            setMissed((prev) => prev + 1);
            completed = false;
          } else {
            completed = true;
          }
          return {
            ...each,
            targetDate: newDate,
            upcoming: upcoming,
            completed,
          };
        });
        if (notifPage) {
          const upcomingEvents = newActiveMilestones.filter((each) => {
            return each.upcoming === true;
          });
          setTaskList(() => upcomingEvents);
        } else if (missPage) {
          const missedEvents = newActiveMilestones.filter((each) => {
            return each.completed === false;
          });
          setTaskList(() => missedEvents);
        } else {
          setTaskList(() => newActiveMilestones);
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err);
      });
  };

  useEffect(() => {
    const asyncwrapper = async () => {
      await updatePage();
    };
    asyncwrapper();
  }, [notifPage, missPage]);

  const deleteTask = async (_id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    await axios
      .post(
        "/api/v1/milestones/delete",
        {
          milestoneID: _id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (res) => {
        await updatePage();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTask = () => {
    updatePage();
  };

  return (
    <div>
      <Header />
      {notifPage && (
        <h1 className={`${styles.notif}`}>
          Upcoming Tasks for the Next Seven Days
        </h1>
      )}
      {missPage && <h1 className={`${styles.notif}`}>Missed Tasks</h1>}
      <article className={styles.flexWrapper}>
        <Responsivesidemenu1
          createTask={updateTask}
          notifications={notifications}
          missed={missed}
          setNotifPage={setNotifPage}
          setMissPage={setMissPage}
          totalTasks={totalTasks}
        />

        <div className={styles["task-container"]}>
          {taskList &&
            taskList.map((obj, index) => (
              <Card
                key={obj._id}
                _id={obj._id}
                taskObj={obj}
                index={index}
                deleteTask={() => deleteTask(obj._id)}
                updateTask={updateTask}
              />
            ))}
        </div>
      </article>
    </div>
  );
};
