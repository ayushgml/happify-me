import React from "react";

export const TableHeader = () => {
  let header = ["date", "score", "remarks"];
  return header.map((key, index) => {
    return <th key={index}>{key.toUpperCase()}</th>;
  });
};
