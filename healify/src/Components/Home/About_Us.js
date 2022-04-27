import React from "react";
import aboutstyles from "./About_us.module.css";
import { Header } from "./Header";
export const AboutUs = () => {
  return (
    <>
      <Header />
      <div className={aboutstyles.aboutmain}>
        <div className={aboutstyles.header}>
          <h2>A SHORT GUIDE TO HAPPIFY ME</h2>
        </div>
        <header className={aboutstyles.heading}>
          <div className={aboutstyles.added}>
            <h2>ABOUT HAPPIFY ME</h2>
          </div>
        </header>

        {/* <h5>Milestones</h5> */}
        <div className={aboutstyles.fakeimg}>
          Dealing with mental health is what makes us human. But for a lot of
          us, it's a struggle to be open about it. Even if we are open about it,
          there is a global shortage of psychiatrists and lack of mental health
          care access in rural regions s. In this context, we feel that apps can
          serve as a viable tool to bridge the mental health treatment gap. Our
          app serves as a User feedback system for self-management and
          maintaining good mental health of every individual. This app
          encourages Users to maintain their milestones records so that they can
          focus on what is important. We intend this to be a part of their
          self-care task so that Users feel active. The web-app provides an
          option to read good news articles and some wholesome memes for
          recreation. This app can be revisited every day, to keep oneself
          occupied with his goals and not fall into the stress holes created by
          the world around him.{" "}
          {/* <img clasName={aboutstyles.imagestyle}  src="https://static.vecteezy.com/system/resources/previews/000/425/393/original/outstanding-mental-health-vector.jpg" /> */}
        </div>

        <header className={aboutstyles.heading}>
          <div className={aboutstyles.added}>
            <h2>ROLES</h2>
          </div>
        </header>
        {/* <h2>Roles</h2> */}
        {/* <h5>Milestones</h5> */}
        <div className={aboutstyles.fakeimg}>
          <b>Primary User:</b>
          <p>
            happify me tries to monitor mental health through well-detailed quizzes
            and tries to keep the User active and positive through various
            activities. To avail these services one may register as a{" "}
            <b>User</b> in the signup page.
          </p>
          <br />
          <b>Event Organizer:</b>
          <p>
            An Event Organizer can market virtual events, conferences and
            related activities through the Events Section of happify me. To do this
            one must register as an <b>organizer</b> in the signup page.
          </p>
          {/* <img clasName={aboutstyles.imagestyle}  src="https://static.vecteezy.com/system/resources/previews/000/425/393/original/outstanding-mental-health-vector.jpg" /> */}
        </div>

        <header className={aboutstyles.heading}>
          <div className={aboutstyles.added}>
            <h2>Guide for primary User</h2>
          </div>
        </header>
        <div className={aboutstyles.row}>
          {/* <header className={aboutstyles.heading}>
          <div className={aboutstyles.added}>
        <h2>Guide for primary User</h2>
        </div>
         </header> */}
          <div className={aboutstyles.fakeimg}>
            <b>Quiz Page:</b>
            <p>
              happify me tries to monitor mental health through well-detailed
              quizzes and tries to keep the User active and positive through
              various activities.
            </p>
            <br />
            <b>Milestones:</b>
            <p>
              The primary User can create a new milestone set the target date
              add subtasks edit delete subtasks and milestones.
            </p>

            <b>Articles:</b>
            <p>
              The primary User can get suggested articles , they can also search
              for news articles, get to know more information.
            </p>

            <b>Events:</b>
            <p>
              An Event Organizer can market virtual events, conferences and
              related activities through the Events Section of happify me.
            </p>
            <b>Need To Talk?:</b>
            <p>
              The Primary User can save contact names and emails ,select a
              message template, and can sent that message to one of cotacts in
              contactlist.
            </p>
            <b>Memes and Other Activities:</b>
            <p>
              The primary User can watch different memes through this feature.
            </p>
            {/* <img clasName={aboutstyles.imagestyle}  src="https://static.vecteezy.com/system/resources/previews/000/425/393/original/outstanding-mental-health-vector.jpg" /> */}
          </div>
        </div>

        <div className={aboutstyles.row}>
          <header className={aboutstyles.heading}>
            <div className={aboutstyles.added}>
              <h2>Guide for Event Organizer</h2>
            </div>
          </header>

          <div className={aboutstyles.fakeimg}>
            <b>Create Event:</b>
            <p>
              An Event organizer can create a virtual events,create a platform
              for users to register wheras a primary user can view the events
              and mark them as interested if they are interested and view those,
              register for them .
            </p>
            <br />
            <b>Manage Events:</b>
            <p>
              An Event Organizer can market virtual events, conferences and
              related activities through the Events Section of happify me.
              Organizers can post announcements and check reviews using this
              module.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutUs;
