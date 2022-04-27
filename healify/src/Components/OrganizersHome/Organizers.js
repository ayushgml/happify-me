import React from "react";
import { Header } from "../Home/Header";
import styles from "../Home/Home.module.css";
import OrganizersHome from "./OrganizersHome";
const Organizers = () => {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row flex-nowrap">
          {/* <Navbar /> */}
          <div className="col py-3">
            <OrganizersHome />
          </div>
        </div>
      </div>
      <footer>
        <div className={styles["bottom-container"]}>
          <a
            className={styles["footer-link"]}
            href="https://twitter.com/iit_tirupati?s=20"
          >
            Twitter
          </a>
          <a className={styles["footer-link"]} href="https://iittp.ac.in/">
            Website
          </a>
          <p className={styles.copyright}>© 2021 IIT Tirupati</p>
        </div>
      </footer>
    </>
  );
};
export default Organizers;
