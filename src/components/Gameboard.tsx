import React from "react";
import AnswerPanel from "./AnswerPanel";

const Gameboard = () => {
  return (
    <div>
      <AnswerPanel idx={1} />
      <AnswerPanel idx={2} />
    </div>
  );
};

export default Gameboard;
