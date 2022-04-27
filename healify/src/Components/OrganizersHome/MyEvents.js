/* Events Page(Of management) for organizers */

import React from "react";
import { Header } from "../Home/Header";
import styles from "../Events/Events.module.css";
import imgDef from "../../Assets/user.png";
import { useHistory } from "react-router";

import { ReadMore } from "../Milestones/ReadMore";
import ConfirmDialog from "../Milestones/ConfirmDialog";

import { useState, useEffect } from "react";
import axios from "axios";

const deleteEvent = async (_id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  await axios
    .post(
      "/api/v1/organizer/remove-event",
      {
        eventId: _id,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((err) => {
      console.log(err);
    });
};

const object = {
  isOpen: true,
  title: "Are you sure You Want to delete this Event?",
  subTitle: "You can't undo this operation",
  onConfirm: (_id) => {
    deleteEvent(_id);
  },
};

export const MyEvents = () => {
  const [events, setEvents] = useState();
  const history = useHistory();
  const [confirmDialog, setConfirmDialog] = useState();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const asyncWrapper = async () => {
      await axios
        .get("/api/v1/organizer/", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setEvents(res.data.data);
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.body);
          }
        });
    };
    asyncWrapper();
  }, [confirmDialog]);
  return (
    <div className="App">
      <Header />
      <h1 className={styles.heading}>Mental Health Virtual Events</h1>
      <article className={`${styles.articleContainer}`}>
        <section className={`${styles.sectionContainer}`}>
          {events &&
            events.map((datum) => {
              return (
                <section key={datum._id} className={`${styles.cardContainer}`}>
                  <div className={`${styles.cardSubContainer}`}>
                    <div className={`${styles.imgContainer}`}>
                      <img
                        width="100%"
                        top
                        src={datum.eventImage || imgDef}
                        alt="Card image cap"
                      />
                    </div>

                    <div className={`${styles.cardInfo}`}>
                      <div>{datum.eventName}</div>
                      <div className="mb-2 text-muted">Date : {datum.date}</div>
                      {/* <CardText>{datum.description}</CardText> */}
                      <div>
                        <ReadMore>{datum.description}</ReadMore>
                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() => {
                          history.push(`/organizerEventView${datum._id}`);
                        }}
                      >
                        View
                      </button>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        onClick={() => {
                          setConfirmDialog({ ...object, param: datum._id });
                          // deleteEvent(datum._id);
                        }}
                      >
                        Cancel Event
                      </button>
                    </div>
                  </div>
                </section>
              );
            })}
        </section>
      </article>

      {confirmDialog && confirmDialog.isOpen && (
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      )}
    </div>
  );
};
