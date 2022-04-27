import React from "react";
import styles2 from "../Home/Home.module.css";
import styles3 from "./QuizLanding.module.css";
import img from "../../Assets/test.png";
import illImg from "../../Assets/ill.jpg";
import phyImg from "../../Assets/physical.jpg";
import controlImg from "../../Assets/control.jpg";
import copingImg from "../../Assets/coping.jpg";
import anime2 from "../../Assets/anime2.mp4";
import ConfirmDialog from "../Milestones/ConfirmDialog";

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Header } from "../Home/Header";
import { useHistory } from "react-router";

export const QuizLanding = () => {
  const [filled, setFilled] = useState(true);
  const history = useHistory();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: true,
    title: "Please Enter Your Profile Details for a Better Evaluation",
    subTitle: "Click On Your UserName in the Header to go to Profile Page",
    onConfirm: () => {
      history.push("/profile");
    },
  });
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    axios
      .get(`/api/v1/profile`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { BirthDay, Gender, UserName } = res.data.data;
        if (!BirthDay || !Gender) {
          setFilled(false);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        }
      });
  }, []);
  return (
    <>
      <Header />
      {!filled && (
        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
        />
      )}
      <div className={styles3.quizBody}>
        <div className={styles3.topDiv}>
          {/* <img src={img} alt="" className={styles3.topDivImg} /> */}
          <video autoPlay loop muted height="450px" width="70%">
            <source src={anime2} type="video/mp4" />
          </video>
          <p className={styles3.para1}>
            Online screening is one of the quickest and easiest ways to
            determine whether you are experiencing symptoms of a mental health
            condition. Mental health conditions, such as depression or anxiety,
            are real, common and treatable. And recovery is possible.
          </p>
        </div>
        <h1 className={styles3.heading}>Take quiz by category</h1>
        <div className={styles3.container}>
          <div className={styles3.category}>
            <Link to="/Quiz1" className={styles2.remove_underline}>
              <img className={styles3.logo} src={illImg} alt="" />
              <p className={styles3.txt}>Ill being and Well being</p>
            </Link>
          </div>
          <div className={styles3.category}>
            <Link to="/Quiz2" className={styles2.remove_underline}>
              <img className={styles3.logo} src={phyImg} alt="" />
              <p className={styles3.txt}>Control and Coping</p>
            </Link>
          </div>
          <div className={styles3.category}>
            <Link to="/Quiz3" className={styles2.remove_underline}>
              <img className={styles3.logo} src={controlImg} alt="" />
              <p className={styles3.txt}>Relationships and Belonging</p>
            </Link>
          </div>
          <div className={styles3.category}>
            <Link to="/Quiz4" className={styles2.remove_underline}>
              <img className={styles3.logo} src={copingImg} alt="" />
              <p className={styles3.txt}>Self Perception</p>
            </Link>
          </div>
        </div>
        <h1 className={styles3.heading}>View statistics by category</h1>
        <div className={styles3.container}>
          <div className={styles3.category}>
            <Link to="/QuizStatistics/1" className={styles2.remove_underline}>
              <img className={styles3.logo} src={illImg} alt="" />
              <p className={styles3.txt}>Ill being and Well being</p>
            </Link>
          </div>
          <div className={styles3.category}>
            <Link to="/QuizStatistics/2" className={styles2.remove_underline}>
              <img className={styles3.logo} src={phyImg} alt="" />
              <p className={styles3.txt}>Control and Coping</p>
            </Link>
          </div>
          <div className={styles3.category}>
            <Link to="/QuizStatistics/3" className={styles2.remove_underline}>
              <img className={styles3.logo} src={controlImg} alt="" />
              <p className={styles3.txt}>Relationships and Belonging</p>
            </Link>
          </div>
          <div className={styles3.category}>
            <Link to="/QuizStatistics/4" className={styles2.remove_underline}>
              <img className={styles3.logo} src={copingImg} alt="" />
              <p className={styles3.txt}>Self Perception</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
