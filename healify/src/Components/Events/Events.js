/*

Code For Events Page As seen by a regular user
Not To be mistaken for similar page meant for event organizers

*/

import React from "react";

import { Header } from "../Home/Header";
import styles from "./Events.module.css";
import imgDef from "../../Assets/user.png";
import { useHistory } from "react-router";

import { ReadMore } from "../Milestones/ReadMore";

import { useState, useEffect } from "react";
import axios from "axios";

export const Events = (props) => {
  const [events, setEvents] = useState();

  const [pageIsInterested, setPageIsInterested] = useState(props.markedEvents);
  const history = useHistory();

  const markInterested = async (_id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    await axios
      .post(
        "/api/v1/events/favourites",
        {
          eventId: _id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // Getting Changed Event by ref
        const changedEvent = events.find((each) => each._id === _id);
        changedEvent.marked = true;
        const newEvents = [...events];
        setEvents(() => newEvents);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.body);
        }
      });
  };

  const unMarkFromInterested = async (_id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    await axios
      .post(
        "/api/v1/events/removeFromFavourites",
        {
          eventId: _id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        // Getting Changed Event by ref
        const changedEvent = events.find((each) => each._id === _id);
        changedEvent.marked = false;
        const newEvents = [...events];
        setEvents(() => newEvents);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.body);
        }
      });
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const url = pageIsInterested
      ? "/api/v1/events/favourites"
      : "/api/v1/events/";
    const asyncWrapper = async () => {
      await axios
        .get(url, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then(async (res) => {
          // Can Do Better Here
          const allEvents = res.data.data;
          allEvents.sort((a, b) => {
            return a.date < b.date ? 1 : -1;
          });
          // Cross Check with interested events in User's list
          //  and add marked as interesting property to each event
          // Show some info ig!!
          if (!pageIsInterested) {
            await axios
              .get("/api/v1/profile/event_details", {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              })
              .then((res) => {
                const favEvents = res.data.data;
                const newAllEvents = allEvents.map((each) => {
                  if (favEvents.includes(each._id)) {
                    return { ...each, marked: true };
                  } else {
                    return { ...each, marked: false };
                  }
                });
                setEvents(newAllEvents);
              })
              .catch((err) => {
                if (err.response) {
                  console.log(err.response.body);
                }
                console.log(err);
              });
          } else {
            setEvents(allEvents);
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response.body);
          }
        });
    };
    asyncWrapper();
  }, [pageIsInterested]);
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
                        src={datum.eventImage || imgDef}
                        alt="Card for Event"
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
                        className={`btn btn-primary ${styles.btnScale}`}
                        onClick={() => {
                          history.push(`/userEventView${datum._id}`);
                        }}
                      >
                        View
                      </button>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {!pageIsInterested &&
                        ((datum.marked && (
                          <button
                            type="button"
                            className={`btn btn-outline-danger ${styles.btnScale}`}
                            onClick={() => {
                              unMarkFromInterested(datum._id);
                            }}
                          >
                            Remove From Interested{" "}
                          </button>
                        )) || (
                          <button
                            type="button"
                            className={`btn btn-outline-danger ${styles.btnScale}`}
                            onClick={() => {
                              markInterested(datum._id);
                            }}
                          >
                            Mark As Interested
                          </button>
                        ))}
                    </div>
                  </div>
                </section>
              );
            })}
        </section>
      </article>
      <div
        className={`${styles.fixedLink}`}
        onClick={() => {
          if (pageIsInterested) {
            setPageIsInterested(false);
            history.replace("/Events");
          } else {
            setPageIsInterested(true);
            history.replace("/FavouriteEvents");
          }
        }}
      >
        {pageIsInterested ? "Go_Back To All Events" : "Go To Interested Events"}
      </div>
    </div>
  );
};
