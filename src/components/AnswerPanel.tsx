import React from "react";
import { Flipper, Flipped } from "react-flip-toolkit";

const LocationNumber = ({ index }: { index: number }) => {
  return (
    //className="flex w-fit min-w-4 p-2 items-center justify-center aspect-square  border-solid border-2"
    <Flipped flipId={"answer" + index}>
      <div
        style={{
          display: "flex",
          width: "fit-content",
          minWidth: "1rem",
          padding: "0.5rem",
          alignItems: "center",
          justifyContent: "center",
          aspectRatio: "2/1",
          border: "1px solid blue",
          borderRadius: "50%",
        }}
      >
        {index}
      </div>
    </Flipped>
  );
};

const Answer = ({
  answer,
  score,
  index,
}: {
  answer: string;
  score: number;
  index: number;
}) => {
  return (
    <Flipped flipId={"answer" + index}>
      <div>
        <div>{answer}</div>
        <div>{score}</div>
      </div>
    </Flipped>
  );
};

const AnswerPanel = ({
  idx,
  answer,
  score,
  flipped,
}: {
  idx: number;
  answer: string;
  score: number;
  flipped: boolean;
}) => {
  return (
    <Flipper className="answer-panel border m-2" flipKey={flipped}>
      {flipped ? (
        <Answer answer={answer} score={score} index={idx} />
      ) : (
        <LocationNumber index={idx} />
      )}
    </Flipper>
  );
};

export default AnswerPanel;
