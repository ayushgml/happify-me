import React from "react";
import styles from "./Statistics.module.css";
import { Table } from "./Table";
import { TableHeader } from "./TableHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../Home/Header";
import { Link } from "react-router-dom";
import styles2 from "../Quiz/Quiz.module.css";

const map = (category) => {
  let res;
  switch (true) {
    case category === "Ill Being and Well Being":
      res = 1;
      break;
    case category === "Control and Coping":
      res = 2;
      break;
    case category === "Relationships and Belonging":
      res = 3;
      break;
    case category === "Self Perception":
      res = 4;
      break;
    default:
      res = -1;
      break;
  }
  return res;
};
export const QuizStatistics = ({ category }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  // const queryString = "quizId=" + quizId;
  useEffect(() => {
    const fetchData = async () => {
      const id = map(category);
      await axios
        .get(`/api/v1/quiz/statistics?quizId=${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const { scoreArr } = res.data.data;
          // date,id,score,remark
          if (!scoreArr) {
            setData(-1);
          } else {
            const newScoreArray = scoreArr.map((each) => {
              let newDate = each.date.split("T")[0];
              newDate = newDate.split("-").reverse().join("-");
              return {
                ...each,
                date: newDate,
              };
            });
            setData(newScoreArray);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);
  const [data, setData] = useState([
    { _id: "", date: "", score: "", remarks: "" },
  ]);

  return (
    <>
      <Header />
      <div>
        <h1 id={styles.title}>{category}</h1>
        {data === -1 ? (
          <h2>"Data not available"</h2>
        ) : (
          <table id={styles.students}>
            <tbody>
              <tr>
                <TableHeader />
              </tr>
              <Table data={data} />
            </tbody>
          </table>
        )}
        <Link to="/QuizLanding" className={styles2.remove}>
          <button className={styles2.playBtn + " " + styles.btn}>Back</button>
        </Link>
      </div>
    </>
  );
};
