import React, { useState } from "react";
import styles from "./MilestonesHome.module.css";
export const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className={styles.text}>
      {isReadMore ? text.slice(0, 100) : text}

      {text && text.length > 100 && (
        <span onClick={toggleReadMore} className={styles["read-or-hide"]}>
          {isReadMore ? " ...read more" : " show less"}
        </span>
      )}
    </p>
  );
};
export default ReadMore;
