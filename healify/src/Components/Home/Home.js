import React from "react";
import anime1 from "../../Assets/anime1.mp4";
import image from "../../Assets/homePage.jpg";
import quizimg from "../../Assets/quiz.jpg";
import newsimg from "../../Assets/news.jpg";
import memeimg from "../../Assets/meme.jpg";
import styles from "./Home.module.css";
import milestoneimg from "../../Assets/milestone.jpg";
import eventsimg from "../../Assets/events.jpg";
import drumkitimg from "../../Assets/drumkit.jpg";
import mailimg from "../../Assets/images/mail.png";
import colorgameimg from "../../Assets/images/colorgame.png";
import { Card } from "./Card";
import { Header } from "./Header";
import { useState, useEffect } from "react";
import { QuotesArray } from "./Quotes";
import { FadeWrapper } from "../FadeWrapper";
import "../../App.css";
import { AppearWrapper } from "../AppearWrapper";
export const Home = () => {
  const [quote1, setQuote1] = useState("Your mental health is a priority");
  const [quote2, setQuote2] = useState(
    "Self care is not a luxury. It's a necessity"
  );
  useEffect(() => {
    let id;
    const asyncWrapper = async () => {
      id = setInterval(() => {
        const index = Math.floor(Math.random() * 6);
        setQuote1(() => {
          return "";
        });
        setQuote1(() => {
          return QuotesArray[index];
        });
        const index2 = Math.floor(Math.random() * 6);
        setQuote2(() => {
          return "";
        });
        setQuote2(() => {
          return QuotesArray[index2];
        });
      }, 10000);
    };
    asyncWrapper();
    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <>
      <Header />
      <div className={styles.maindiv}>
        <div className={styles.container}>
          <div className={styles["top-container"]}>
            <section className={`${styles.blurImage}`}>
              <div className={styles.img}>
                <img src={image} alt="home" />
                {quote1 && <h4 className={styles.quote1}>{quote1}</h4>}
                {quote2 && <h4 className={styles.quote2}>{quote2}</h4>}
              </div>
            </section>
            <div className={styles.topDiv}>
              <AppearWrapper>
                <video autoPlay loop muted className={styles.video}>
                  <source src={anime1} type="video/mp4" />
                </video>
              </AppearWrapper>

              <p>
                Just as physical fitness helps our bodies to stay strong, mental
                fitness helps us to achieve and sustain a state of good mental
                health. When we are mentally healthy, we enjoy our life and
                environment, and the people in it. We can be creative, learn,
                try new things, and take risks. We are better able to cope with
                difficult times in our personal and professional lives. We feel
                the sadness and anger that can come with the death of a loved
                one, a job loss or relationship problems and other difficult
                events, but in time, we are able to get on with and enjoy our
                lives once again. Nurturing our mental health can also help us
                combat or prevent the mental health problems that are sometimes
                associated with a chronic physical illness. In some cases, it
                can prevent the onset or relapse of a physical or mental
                illness. Managing stress well, for instance, can have a positive
                impact on heart disease.
              </p>
            </div>

            <section className={`${styles.blur}`}>
              <section className={`${styles.mdbCustom}`}>
                <FadeWrapper>
                  <Card
                    path="/QuizLanding"
                    imgSrc={quizimg}
                    alt={"..."}
                    cardName={`Quiz`}
                    cardDesc={`Take our Mental Health Self Assessment Test to know about
        your mental health. Answer all the questions honestly.`}
                  />
                </FadeWrapper>
                <FadeWrapper>
                  <Card
                    path="/News2"
                    imgSrc={newsimg}
                    alt={"..."}
                    cardName={`Articles`}
                    cardDesc={`
            A good article is like a wholesome healthy meal for your
            brain and mental well-being. So check out some latest news
            and feed your brain.`}
                  />
                </FadeWrapper>
                <FadeWrapper>
                  <Card
                    path="/Memes"
                    imgSrc={memeimg}
                    alt={"..."}
                    cardName={`Memes`}
                    cardDesc={`Watch some wholesome memes and share them with your family
            and friends.`}
                  />
                </FadeWrapper>
                <FadeWrapper>
                  <Card
                    path="/MilestonesHome"
                    imgSrc={milestoneimg}
                    alt={"..."}
                    cardName={`Milestones`}
                    cardDesc={`Create tasks and mark them as completed upon successful
            completion. You can see your achievements in the form of a
            timeline and keep yourselves motivated.`}
                  />
                </FadeWrapper>
                <FadeWrapper>
                  <Card
                    path="/Events"
                    imgSrc={eventsimg}
                    alt={"..."}
                    cardName={` Virtual Events`}
                    cardDesc={`Explore virtual events on mental health. Register to the
              events and improve your well-being. Rate the events and ask your
              questions in the FAQ section.`}
                  />
                </FadeWrapper>
                <FadeWrapper>
                  {" "}
                  <Card
                    path="/Emotions"
                    imgSrc={drumkitimg}
                    alt={"..."}
                    cardName={`Emotions`}
                    cardDesc={`Diary entry to detect your emotions and analyze them.`}
                  />
                </FadeWrapper>
                <FadeWrapper>
                  <Card
                    path="/ColorGame"
                    imgSrc={colorgameimg}
                    alt={"..."}
                    cardName={`Color Game`}
                    cardDesc={`Play our simple color-memory game to feel focused`}
                  />
                </FadeWrapper>
                <FadeWrapper>
                  <Card
                    path="/Mailer"
                    imgSrc={mailimg}
                    alt={"..."}
                    cardName={`Need To Talk?`}
                    cardDesc={`Feeling Down? Need to talk to someone but don't know how to start!? We're here for u. Just Let us alert your friends that u need a breather!! `}
                  />
                </FadeWrapper>
              </section>
            </section>
          </div>
        </div>
      </div>

      <footer>
        {" "}
        <div className={styles["bottom-container"]}>
          <p className={styles.copyright}>© 2022 VIT Vellore</p>
        </div>
      </footer>
    </>
  );
};
