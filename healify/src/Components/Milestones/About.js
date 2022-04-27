import React from "react";
import styles from "./About.module.css";
export const About = () => {
  return (
    <div className={styles.allow}>
      <div className={styles.section}>
        <div className={styles.container}>
          <div className={styles["content-section"]}>
            <div className={styles.title}>
              <h1 className={styles.heading}>About Milestones</h1>
            </div>
            <div className={styles.content}>
              <h3>Importance of Milestones</h3>
              <p>
                A milestone is a marker of a certain signifies a change or stage
                in development. Milestones ensure us to stay on track , and we
                will be able to monitor subtasks. Milestones are powerful
                because they demonstrate forward progress in your task
                Completion. And they help you monitor deadlines, identify
                important dates, and recognize potential bottlenecks within the
                milestone. If you were to strip the tasks from your milestone,
                the milestones would still give an outline of the key steps or
                phases of the project.
              </p>
              <br />
              <h3>How to set up A New Milestone??</h3>
              <p>
                1. Create a New Milestone by clicking on the &nbsp;{" "}
                <i class="fas fa-pencil"></i> &nbsp; Create new in the sidebar
                &nbsp; &nbsp; menu.
                <br />
                2. Set up your milestone enter your Milestone Title , Target
                Date , Add &nbsp; &nbsp;your Subtasks.
                <br />
                3.You can Strike off your Subtask when it is completed. To do
                that Click on &nbsp; <i class="fas fa-edit"></i> &nbsp;. Now
                Click on the subtask and it will strike it off.
                <br />
                4.Based on the status of your completion of Milestone subtasks
                the milestone will be given a color code. (Green for completed,
                Orange-yellow for partial and Red for unattended)
                <br />
                <br />
                &nbsp;&nbsp;
                <div className={styles.box + " " + styles.red}></div> &nbsp;
                Incompleted Milestone
                <br />
                &nbsp;
                <div className={styles.box + " " + styles.orangered}></div>{" "}
                <br /> &nbsp; &nbsp; Partially Completed Milestone
                <br />
                &nbsp;&nbsp;
                <div
                  className={styles.box + " " + styles.green}
                ></div> <br /> &nbsp; &nbsp; Completed Milestone
                <br />
                <br />
                5.You can delete your milestone incase if it is completed.
              </p>
              <br />
              <h2>Go Ahead ! Create your Milestone Now !</h2>
            </div>
          </div>
          <div className={styles["image-section"]}>
            <img src="https://cdn.cleverism.com/wp-content/uploads/2016/04/214-Everything-You-Need-to-Know-about-Milestones-Planning.png.webp" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
