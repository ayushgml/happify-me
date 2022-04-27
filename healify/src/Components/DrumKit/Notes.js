import React from "react";
import styles from "./Drumkit.module.css";

export const Notes = (props) => {
  const { note } = props;
  const [noteIndex, setMessageIndex] = React.useState(0);

  React.useEffect(() => {
    let timeout;
    if (noteIndex < note.length - 1) {
      timeout = setTimeout(() => setMessageIndex(noteIndex + 1), 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [note, noteIndex]);

  return (
    <div>
      <img
        src={note[noteIndex]}
        className={styles.letter}
        alt={"KeyNote"}
      ></img>
    </div>
  );
};
