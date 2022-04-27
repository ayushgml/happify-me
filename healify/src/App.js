import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import { Quiz } from "./Components/Quiz/Quiz";
import { Memes } from "./Components/Memes/Memes";
import { MilestonesHome } from "./Components/Milestones/MilestonesHome";
import "./Components/Milestones/MilestonesHome.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { QuizLanding } from "./Components/Quiz/QuizLanding";
import { Questions1 } from "./Components/Quiz/Questions/QueCategory1";
import { Questions2 } from "./Components/Quiz/Questions/QueCategory2";
import { Questions3 } from "./Components/Quiz/Questions/QueCategory3";
import { Questions4 } from "./Components/Quiz/Questions/QueCategory4";
import { Score } from "./Components/Quiz/Score";
import { QuizStatistics } from "./Components/Statistics/QuizStatistics";
import { Events } from "./Components/Events/Events";
import { Eventview } from "./Components/Events/Eventview";
import News2 from "./Components/News/News2";
import { Emotions } from "./Components/Emotions/Emotions";
import Organizers from "./Components/OrganizersHome/Organizers";
import { Mailer } from "./Components/Mailer/Mailer";
import { About } from "./Components/Milestones/About";
import { ColorGame } from "./Components/ColorGame/ColorGame";
import { Profile } from "./Components/Profile/Profile";
import { useState, useEffect } from "react";
import { Email } from "./Components/Mailer/Email";
import { AddUser } from "./Components/Mailer/AddUser";
import { ContactHome } from "./Components/Mailer/ContactHome";
import { AboutUs } from "./Components/Home/About_Us";
import "./App.css";
import axios from "axios";

import { useToken } from "./CustomHooks/useToken";
import { Createnewevent } from "./Components/OrganizersHome/Createnewevent";

function App() {
  // const { token, setToken, role, setRole } = useToken();
  // const [birthday, setBirthday] = useState("");
  // const [gender, setGender] = useState("");

  // const [condn, setCond] = useState("");

  // useEffect(() => {
  //   setCond(role);
  //   const asyncWrapper = async () => {
  //     await axios
  //       .get(`/api/v1/profile`, {
  //         headers: {
  //           authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         const { BirthDay, Gender } = res.data.data;
  //         setBirthday(BirthDay);
  //         setGender(Gender);
  //       })
  //       .catch((err) => {
  //         if (err.response) {
  //           console.log(err.response);
  //         }
  //       });
  //   };
  //   asyncWrapper();
  // }, []);

  return (
        // <div className="App">
        //   <Router>
        //     <Switch>
        //       <Route exact path="/">
        //         <Home />
        //       </Route>
        //       <Route path="/About_Us">
        //         <AboutUs />
        //       </Route>
        //       {/* <Route path="*">
        //         <h1 className={"warning"}>Please Login To continue</h1>
        //         <Signup
        //           setToken={setToken}
        //           setRole={(param) => {
        //             setCond(param);
        //             setRole(param);
        //           }}
        //         />
        //       </Route> */}
        //     </Switch>
        //   </Router>
        // </div>
        // (condn === "user" && (
          <div className="App">
            <Router>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                {/* <Route path="/login">
                  <Signup
                    setToken={setToken}
                    setRole={(param) => {
                      setCond(param);
                      setRole(param);
                    }}
                  />
                </Route>
                <Route path="/Registration">
                  <Registration
                    setToken={setToken}
                    setRole={(param) => {
                      setCond(param);
                      setRole(param);
                    }}
                  />
                </Route> */}

                <Route exact path="/News2">
                  <News2 />
                </Route>
                <Route path="/Memes">
                  <Memes />
                </Route>
                <Route path="/Mailer">
                  <Mailer />
                </Route>
                <Route path="/Profile">
                  <Profile />
                </Route>
                <Route exact path="/AddUser">
                  <AddUser />
                </Route>
                <Route path="/ContactHome">
                  <ContactHome />
                </Route>
                <Route
                  path="/MilestonesHome"
                  children={
                    <MilestonesHome
                      notificationPage={false}
                      missedPage={false}
                    />
                  }
                ></Route>
                <Route
                  path="/Notifications"
                  children={
                    <MilestonesHome
                      notificationPage={true}
                      missedPage={false}
                    />
                  }
                ></Route>
                <Route
                  path="/Missed"
                  children={
                    <MilestonesHome
                      notificationPage={false}
                      missedPage={true}
                    />
                  }
                ></Route>
                <Route path="/About">
                  <About />
                </Route>
                <Route path="/About_Us">
                  <AboutUs />
                </Route>
                <Route path="/Email">
                  <Email />
                </Route>

                <Route path="/QuizLanding">
                  <QuizLanding />
                </Route>

                <Route path="/Quiz1">
                  <Quiz
                    category={"Ill Being and Well Being"}
                    questions={Questions1}
                    birthday="19-03-70"
                    gender="male"
                  />
                </Route>
                <Route path="/Quiz2">
                  <Quiz
                    category={"Control and Coping"}
                    questions={Questions2}
                    birthday="19-03-70"
                    gender="male"
                  />
                </Route>
                <Route path="/Quiz3">
                  <Quiz
                    category={"Relationships and Belonging"}
                    questions={Questions3}
                    birthday="19-03-70"
                    gender="male"
                  />
                </Route>
                <Route path="/Quiz4">
                  <Quiz
                    category={"Self Perception"}
                    questions={Questions4}
                    birthday="19-03-70"
                    gender="male"
                  />
                </Route>
                <Route path="/Score">
                  <Score />
                </Route>
                <Route path="/QuizStatistics/1">
                  <QuizStatistics category="Ill Being and Well Being" />
                </Route>
                <Route path="/QuizStatistics/2">
                  <QuizStatistics category="Control and Coping" />
                </Route>
                <Route path="/QuizStatistics/3">
                  <QuizStatistics category="Relationships and Belonging" />
                </Route>
                <Route path="/QuizStatistics/4">
                  <QuizStatistics category="Self Perception" />
                </Route>
                {/* Here I'm using Same component with a diff prop to get desired result */}
                <Route path="/Events">
                  <Events markedEvents={false} />
                </Route>
                <Route
                  path="/FavouriteEvents"
                  children={<Events markedEvents={true} />}
                ></Route>
                <Route
                  path="/userEventview:id"
                  children={<Eventview role={"user"} />}
                ></Route>
                <Route path="/Emotions">
                  <Emotions />
                </Route>
                <Route path="/ColorGame">
                  <ColorGame />
                </Route>

                <Route path="*">
                  <Home />
                </Route>
              </Switch>
            </Router>
          </div>
    //     )) ||
    //     (condn === "organizer" && (
    //       <div className="App">
    //         <Router>
    //           <Switch>
    //             <Route path="/login">
    //               <Signup
    //                 setToken={setToken}
    //                 setRole={(param) => {
    //                   setCond(param);
    //                   setRole(param);
    //                 }}
    //               />
    //             </Route>
    //             <Route path="/Registration">
    //               <Registration
    //                 setToken={setToken}
    //                 setRole={(param) => {
    //                   setCond(param);
    //                   setRole(param);
    //                 }}
    //               />
    //             </Route>
    //             <Route exact path="/Organizers">
    //               <Organizers />
    //             </Route>
    //             <Route path="/About_Us">
    //               <AboutUs />
    //             </Route>
    //             <Route
    //               path="/organizerEventview:id"
    //               children={<Eventview role={"organizer"} />}
    //             ></Route>

    //             <Route path="/MyEvents">
    //               <MyEvents />
    //             </Route>

    //             <Route path="/Createnewevent">
    //               <Createnewevent />
    //             </Route>
    //             <Route path="/Notes">
    //               <Notes />
    //             </Route>
    //             <Route path="*">
    //               <Organizers />
    //             </Route>
    //           </Switch>
    //         </Router>
    //       </div>
    //     ))}
    // </>
  );
}
export default App;
