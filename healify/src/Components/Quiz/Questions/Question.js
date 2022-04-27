import React from "react";
import styles from "./Question.module.css";

const Question = ({ qnObject, onChangeHandle, selectedOption }) => {
  return (
    <div>
      <div>
        <h1 className={styles.quizquestionBox}>{qnObject.que}</h1>
        <div>
          <input
            type="radio"
            id={1}
            value={1}
            name={qnObject}
            checked={selectedOption === "1"}
            onChange={onChangeHandle}
          />{" "}
          <label htmlFor={1}>{qnObject.op1}</label>
        </div>

        <div>
          <input
            id={2}
            type="radio"
            value={2}
            name={qnObject}
            checked={selectedOption === "2"}
            onChange={onChangeHandle}
          />{" "}
          <label htmlFor={2}>{qnObject.op2}</label>
        </div>
        <div>
          <input
            type="radio"
            id={3}
            value={3}
            name={qnObject}
            checked={selectedOption === "3"}
            onChange={onChangeHandle}
          />{" "}
          <label htmlFor={3}>{qnObject.op3}</label>
        </div>
        <div>
          <input
            type="radio"
            id={4}
            value={4}
            name={qnObject}
            checked={selectedOption === "4"}
            onChange={onChangeHandle}
          />{" "}
          <label htmlFor={4}>{qnObject.op4}</label>
        </div>
        <div>
          <input
            type="radio"
            value={5}
            id={5}
            name={qnObject}
            checked={selectedOption === "5"}
            onChange={onChangeHandle}
          />{" "}
          <label htmlFor={5}>{qnObject.op5}</label>
        </div>
      </div>
    </div>
  );
};
export default Question;
