import React, { useState } from "react";
export const NewReadMore = ({ subtasks }) => {
  const [isNewReadMore, setIsNewReadMore] = useState(true);
  // const toggleNewReadMore = () => {
  //   setIsNewReadMore(!isNewReadMore);
  // };

  if (subtasks && subtasks.length) {
    return (
      <p className="text">
        {isNewReadMore ? subtasks[0].content.slice(0, 87) : subtasks[0]}. . .
      </p>
    );
  }
  return <></>;
};
export default NewReadMore;
