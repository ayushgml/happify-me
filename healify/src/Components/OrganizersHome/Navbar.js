import React from "react";
//  import styles from "./Togglemenu.module.css";
import styles from "../Milestones/Togglemenu.module.css";
import { Link } from "react-router-dom";
const Navbar_Organizers = () => {
  return (
    <>
      {/* <div className="container-fluid">
        <div className="row flex-nowrap"> */}
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <h3>Events</h3>
          <ul
            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu"
          >
            <Link to="./Organizers" classNameName={styles.remove_underline}>
              <li className="nav-link px-0 align-middle">
                <i className="fs-4 bi-people"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">
                  <i className="fas fa-home"></i>&nbsp;&nbsp;Home
                </span>
              </li>
            </Link>
            <Link to="./Events" classNameName={styles.remove_underline}>
              <li className="nav-link px-0 align-middle">
                <i className="fs-4 bi-people"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">
                  <i class="fa fa-calendar" aria-hidden="true"></i>
                  &nbsp;&nbsp;Events
                </span>
              </li>
            </Link>
            <Link to="./MyEvents" classNameName={styles.remove_underline}>
              <li className="nav-link px-0 align-middle">
                <i className="fs-4 bi-people"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">
                  <i className="fas fa-address-card"></i>&nbsp;&nbsp;My Events
                </span>
              </li>
            </Link>
            <Link to="./UpcomingEvents" classNameName={styles.remove_underline}>
              <li className="nav-link px-0 align-middle">
                <i className="fs-4 bi-people"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">
                  <i class="fa fa-calendar" aria-hidden="true"></i>
                  &nbsp;&nbsp;Upcoming Registered events
                </span>
              </li>
            </Link>

            <Link to="./Createnewevent" classNameName={styles.remove_underline}>
              <li className="nav-link px-0 align-middle">
                <i className="fs-4 bi-people"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-file-earmark-plus"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                  </svg>
                  &nbsp;&nbsp;Create new event
                </span>
              </li>
            </Link>
            <Link to="./About" classNameName={styles.remove_underline}>
              <li className="nav-link px-0 align-middle">
                <i className="fs-4 bi-people"></i>{" "}
                <span className="ms-1 d-none d-sm-inline">
                  <i className="fas fa-blog"></i>&nbsp;&nbsp;About
                </span>
              </li>
            </Link>
          </ul>
          <hr />
          <div classNameName="text-center"></div>
        </div>
      </div>
      {/* <div className="col py-3">
            <OrganizersHome />
          </div> */}
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default Navbar_Organizers;
