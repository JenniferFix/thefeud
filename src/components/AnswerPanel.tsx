import React, { MouseEventHandler } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import { answerState } from "./states";
import { useRecoilState, useRecoilValue } from "recoil";
import { answerSelector } from "./states";
import type { Answer } from "../types";

const RankNumber = ({
  id,
  rank,
  onClick,
}: {
  id: string;
  rank: number;
  onClick: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    //className="flex w-fit min-w-4 p-2 items-center justify-center aspect-square  border-solid border-2"
    <Flipped flipId={"answer" + id}>
      <div
        onClick={onClick}
        className="w-full flex justify-center h-full items-center"
      >
        <div className="border-2 rounded-full aspect-square flex justify-center items-center h-12 text-3xl">
          {rank}
        </div>
      </div>
    </Flipped>
  );
};

const AnswerPane = ({
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
      <div
        onClick={onClick}
        className="flex justify-between h-full items-center"
      >
        <div
          className="text-5xl font-semibold text-white uppercase grow bg-black h-full flex items-center justify-center bg-gradient-to-b  from-blue-900 to-indigo-950"
          style={{ textShadow: "6px 6px black" }}
        >
          {answer}
        </div>
        <div
          className="w-min text-5xl font-medium text-white p-2"
          style={{ textShadow: "4px 4px black" }}
        >
          {score}
        </div>
      </div>
    </Flipped>
  );
};

const AnswerPanel = ({ id }: { id: string }) => {
  const [answerData, setAnswerData] = useRecoilState<Answer>(
    answerSelector(id),
  );
  const { flipped, answer, score, rank } = answerData;

  const handlePanelClick = () => {
    setAnswerData({ ...answerData, flipped: !flipped });
  };

  return (
    <Flipper
      className="answer-panel border m-2 h-20 bg-gradient-to-b from-[#1182f6] to-[#594cc3]"
      flipKey={flipped}
    >
      {flipped ? (
        <AnswerPane
          onClick={handlePanelClick}
          answer={answer}
          score={score}
          index={answerData.id}
        />
      ) : (
        <RankNumber onClick={handlePanelClick} rank={rank} id={id} />
      )}
    </Flipper>
  );
};

export default AnswerPanel;
