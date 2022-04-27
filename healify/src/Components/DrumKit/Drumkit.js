import React from "react";
import styles from "./Drumkit.module.css";
import wSound from "../../Assets/sounds/tom-1.mp3";
import aSound from "../../Assets/sounds/tom-2.mp3";
import sSound from "../../Assets/sounds/tom-3.mp3";
import dSound from "../../Assets/sounds/tom-4.mp3";
import jSound from "../../Assets/sounds/snare.mp3";
import kSound from "../../Assets/sounds/crash.mp3";
import lSound from "../../Assets/sounds/kick-bass.mp3";
import wImg from "../../Assets/images/w.png";
import aImg from "../../Assets/images/a.png";
import sImg from "../../Assets/images/s.png";
import dImg from "../../Assets/images/d.png";
import jImg from "../../Assets/images/j.png";
import kImg from "../../Assets/images/k.png";
import lImg from "../../Assets/images/l.png";
import { Recorder } from "./Recorder";
import { useEffect, useState } from "react";
import { Notes } from "./Notes.js";
import { Header } from "../Home/Header";
export const Drumkit = () => {
  // Alternate way -> set State to the letter and evaluate class based on state=== letter && class

  const musicNotes = [
    [lImg, jImg, sImg, aImg, wImg, kImg],
    [dImg, sImg, dImg, sImg],
    [dImg, jImg, dImg, sImg, jImg, dImg, jImg, dImg, sImg, jImg],
  ];
  const musicArrays = [
    ["l", "j", "s", "a", "w", "k"],
    ["d", "s", "d", "s"],
    ["d", "j", "d", "s", "j", "d", "j", "d", "s", "j,"],
  ];
  const [note, setNote] = useState([]);
  const [arr, setArr] = useState([]);

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [w, setW] = useState(false);
  const [a, setA] = useState(false);
  const [s, setS] = useState(false);
  const [d, setD] = useState(false);
  const [j, setJ] = useState(false);
  const [k, setK] = useState(false);
  const [l, setL] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleClick = (key) => {
    if (arr[index] === key) {
      setScore(() => score + 1);
    }
    setIndex(() => index + 1);
    makesound(key);
    if (index >= arr.length - 1) {
      setIsCompleted(true);
      setIsClicked(false);
    }
  };

  const keyHandle = (e) => {
    const key = e.key;
    makesound(key);
  };

  useEffect(() => {
    window.addEventListener("keypress", keyHandle);
    return () => {
      window.removeEventListener("keypress", keyHandle);
    };
  }, []);

  const handlePlay = () => {
    let rand1 = Math.floor(Math.random() * musicNotes.length);
    setNote(musicNotes[rand1]);
    setArr(musicArrays[rand1]);
    setIndex(0);
    setScore(0);
    setIsClicked(true);
    setIsCompleted(false);
  };

  const makesound = (key) => {
    let audio;
    switch (key) {
      case "w":
        audio = new Audio(wSound);
        audio.play();
        setW(true);
        setTimeout(() => {
          setW(false);
        }, 100);
        break;

      case "a":
        audio = new Audio(aSound);
        audio.play();
        setA(true);
        setTimeout(() => {
          setA(false);
        }, 100);
        break;

      case "s":
        audio = new Audio(sSound);
        audio.play();
        setS(true);
        setTimeout(() => {
          setS(false);
        }, 100);
        break;

      case "d":
        audio = new Audio(dSound);
        audio.play();
        setD(true);
        setTimeout(() => {
          setD(false);
        }, 100);
        break;

      case "j":
        audio = new Audio(jSound);
        audio.play();
        setJ(true);
        setTimeout(() => {
          setJ(false);
        }, 100);
        break;

      case "k":
        audio = new Audio(kSound);
        audio.play();
        setK(true);
        setTimeout(() => {
          setK(false);
        }, 100);
        break;

      case "l":
        audio = new Audio(lSound);
        audio.play();
        setL(true);
        setTimeout(() => {
          setL(false);
        }, 100);
        break;
      default:
    }
  };

  return (
    <>
      <Header />
      <div className={styles.bdy}>
        <div>
          <h1 className={styles.drumkith1}>Drum 🥁 Kit</h1>
          {isClicked ? null : (
            <button className={styles.btn} onClick={handlePlay}>
              Play Note
            </button>
          )}

          {isClicked ? <Notes note={note} /> : null}
          {isCompleted ? (
            <h1 className={styles.score}>
              Your score is {score}/{arr.length}
            </h1>
          ) : null}
          <div className={`${styles.set} ${styles.drum}`}>
            <button
              className={`${styles.w} ${w && styles.pressed} ${styles.drumBtn}`}
              onClick={() => {
                handleClick("w");
              }}
            >
              w
            </button>
            <button
              className={`${styles.a} ${a && styles.pressed} ${styles.drumBtn}`}
              onClick={() => {
                handleClick("a");
              }}
            >
              a
            </button>
            <button
              className={`${styles.s} ${s && styles.pressed} ${styles.drumBtn}`}
              onClick={() => {
                handleClick("s");
              }}
            >
              s
            </button>
            <button
              className={`${styles.d} ${d && styles.pressed} ${styles.drumBtn}`}
              onClick={() => {
                handleClick("d");
              }}
            >
              d
            </button>
            <button
              className={`${styles.j} ${j && styles.pressed} ${styles.drumBtn}`}
              onClick={() => {
                handleClick("j");
              }}
            >
              j
            </button>
            <button
              className={`${styles.k} ${k && styles.pressed} ${styles.drumBtn}`}
              onClick={() => {
                handleClick("k");
              }}
            >
              k
            </button>
            <button
              className={`${styles.l} ${l && styles.pressed} ${styles.drumBtn}`}
              onClick={() => {
                handleClick("l");
              }}
            >
              l
            </button>
          </div>
        </div>

        <Recorder />
      </div>
    </>
  );
};
