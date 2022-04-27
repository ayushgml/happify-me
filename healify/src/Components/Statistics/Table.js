import React from "react";

export const Table = (props) => {
  return props.data.map((datum, index) => {
    const { _id, date, score, remarks } = datum; //destructuring
    return (
      <tr key={_id}>
        <td>{date}</td>
        <td>{score}</td>
        <td>{remarks}</td>
      </tr>
    );
  });
};
