import React, { MouseEventHandler } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import { answerState } from "./states";
import { useRecoilState } from "recoil";

const LocationNumber = ({
  index,
  onClick,
}: {
  index: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
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
        onClick={onClick}
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
  onClick,
}: {
  answer: string;
  score: number;
  index: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <Flipped flipId={"answer" + index}>
      <div onClick={onClick}>
        <div>{answer}</div>
        <div>{score}</div>
      </div>
    </Flipped>
  );
};

const AnswerPanel = ({ id }: { id: string }) => {
  const [answerData, setAnswerData] = useRecoilState(answerState(id));
  const { flipped, answer, score } = answerData;

  const handlePanelClick = () => {
    setAnswerData({ ...answerData, flipped: !flipped });
  };

  return (
    <div>Hello there</div>
    // <Flipper className="answer-panel border m-2" flipKey={flipped}>
    //   {flipped ? (
    //     <Answer
    //       onClick={handlePanelClick}
    //       answer={answer}
    //       score={score}
    //       index={answerData.id}
    //     />
    //   ) : (
    //     <LocationNumber onClick={handlePanelClickenecccbihrkhekvvkbcvnudlgikvucefhjlcvrnrihvg

    //     } index={id} />
    //   )}
    // </Flipper>
  );
};

export default AnswerPanel;
