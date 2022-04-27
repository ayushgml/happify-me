import React from "react";
import { Header } from "../Home/Header";
import styles from "./ColorGame.module.css";
import { useState, useEffect } from "react";
import green from "../../Assets/sounds/green.mp3";

export const ColorGame = () => {
  let buttonColours = ["red", "blue", "green", "yellow"];

  // Arrays of colors 1. Generated seq ------ 2.User Input
  const [gamePattern, setGamePattern] = useState([]);
  const [userClickedPattern, setUserClickedPattern] = useState([]);

  //
  // const [started, setStarted] = useState(false);

  const [level, setLevel] = useState(0);
  const [pressedColor, setPressedColor] = useState();

  // state for condn rend of PASS/FAIL prompts
  const [levelPassed, setLevelPassed] = useState("");

  // State that checks whethere animation is being generated ->Locks click fn
  const [generated, setGenerated] = useState("");

  useEffect(() => {}, [generated]);

  const start = () => {
    // if (!started) {
    nextSequence();
    // setStarted(true);
    // }
  };

  const handleClick = (userChosenColour) => {
    if (generated) {
      return;
    }
    const newUserClickedPattern = [...userClickedPattern, userChosenColour];
    setUserClickedPattern(() => {
      return newUserClickedPattern;
    });

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length, userChosenColour);
  };

  const checkAnswer = (currentLevel, userChosenColour) => {
    if (gamePattern[currentLevel] === userChosenColour) {
      if (userClickedPattern.length === gamePattern.length - 1) {
        setLevelPassed("true");
      }
    } else {
      playSound("wrong");
      setLevelPassed("false");

      setTimeout(() => {
        setLevelPassed("");
      }, 2000);

      startOver();
    }
  };

  const nextSequence = () => {
    setGenerated(() => "reset");
    setUserClickedPattern(() => {
      return [];
    });
    setGamePattern(() => {
      return [];
    });
    let l = level + 1;
    setLevel(() => l);

    let newGamePattern = [];
    let max;
    switch (true) {
      case l < 3:
        max = 3;
        break;
      case l < 5:
        max = 4;
        break;
      case l < 8:
        max = 5;
        break;
      case l < 12:
        max = 6;
        break;
      case l < 16:
        max = 7;
        break;
      case l < 20:
        max = 8;
        break;
      case l < 23:
        max = 9;
        break;
      case l < 27:
        max = 10;
        break;
      case l < 31:
        max = 11;
        break;
      default:
        max = 20;
        break;
    }
    for (let i = 0; i < max; i++) {
      let randomNumber = Math.floor(Math.random() * 4);
      let randomChosenColour = buttonColours[randomNumber];
      newGamePattern.push(randomChosenColour);
      setTimeout(() => {
        setGenerated(() => {
          return randomChosenColour;
        });
        playSound(randomChosenColour);
        if (i !== max - 1) {
          setTimeout(() => {
            setGenerated(() => "reset");
          }, 500);
        } else {
          setTimeout(() => {
            setGenerated(() => "");
          }, 500);
        }
      }, 1000 * (i + 1));

      setGamePattern(() => {
        return newGamePattern;
      });
    }
  };

  const animatePress = (currentColor) => {
    setPressedColor(currentColor);

    setTimeout(() => {
      setPressedColor("");
    }, 500);
  };

  const playSound = (name) => {
    let audio;
    audio = new Audio(green);
    audio.play();
  };

  const startOver = () => {
    setLevel(0);
    setGamePattern([]);
    // setStarted(false);
  };

  return (
    <>
      <Header />

      <div className={styles.maindiv}>
        {(levelPassed === "true" && (
          <div>
            <h1 className={`${styles.pass}`}>Level Passed</h1>
            <button
              className={`btn btn-outline-info ${styles.padding}`}
              onClick={() => {
                setLevelPassed("");
                nextSequence();
              }}
            >
              Go To Next Level
            </button>
          </div>
        )) ||
          (levelPassed === "false" && (
            <div>
              <h1 className={`${styles.pass}`}>Game Over</h1>
              <button
                className={`btn btn-outline-info ${styles.padding}`}
                onClick={() => {
                  setLevelPassed("");
                  startOver();
                }}
              >
                Return To Start
              </button>
            </div>
          )) || (
            <section>
              <h1 className={styles.leveltitle}>
                {(!level && "Press Button To start") || `Level ${level}`}
              </h1>

              <div className={styles.container}>
                <div className={styles.row}>
                  <div
                    type="button"
                    id="green"
                    className={`${styles.btn} ${styles.green} ${
                      pressedColor === "green" && styles.pressed
                    } ${generated === "green" && styles.animateFade}`}
                    onClick={() => {
                      handleClick("green");
                    }}
                  ></div>

                  <div
                    type="button"
                    id="red"
                    className={`${styles.btn} ${styles.red}  ${
                      pressedColor === "red" && styles.pressed
                    } ${generated === "red" && styles.animateFade}`}
                    onClick={() => {
                      handleClick("red");
                    }}
                  ></div>
                </div>

                <div classname={styles.row}>
                  <div
                    type="button"
                    id="yellow"
                    className={`${styles.btn} ${styles.yellow} ${
                      pressedColor === "yellow" && styles.pressed
                    } ${generated === "yellow" && styles.animateFade}`}
                    onClick={() => {
                      handleClick("yellow");
                    }}
                  ></div>
                  <div
                    type="button"
                    id="blue"
                    className={`${styles.btn} ${styles.blue} ${
                      pressedColor === "blue" && styles.pressed
                    } ${generated === "blue" && styles.animateFade}`}
                    onClick={() => {
                      handleClick("blue");
                    }}
                  ></div>
                </div>
              </div>
            </section>
          )}
        {level === 0 ? (
          <button className={`btn btn-outline-warning`} onClick={start}>
            Start
          </button>
        ) : null}
        <h4
          style={{
            color: "white",
            font: "18px arial bold",
            width: "50%",
            margin: "auto",
            marginTop: "20px",
          }}
        >
          Instructions: Click on the Start Button to start the game.In Each
          level a set of color pattern will be generated. Please wait for the
          animations to complete. Once the animations are over Player can Click
          on the Colors in the order and win the game. PS: IT GETS TOUGH AS YOU
          GO ALONG .... SO BE COOL
        </h4>
      </div>
    </>
  );
};
