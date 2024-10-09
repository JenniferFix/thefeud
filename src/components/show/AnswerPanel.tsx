'use client';
import React, { MouseEventHandler } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';

const RankNumber = ({ id, rank }: { id: string; rank?: number }) => {
  return (
    //className="flex w-fit min-w-4 p-2 items-center justify-center aspect-square  border-solid border-2"
    <Flipped flipId={'answer' + id}>
      <div className="w-full flex justify-center h-full items-center">
        {rank && (
          <div className="border-2 rounded-full aspect-square flex justify-center items-center h-12 text-3xl">
            {rank}
          </div>
        )}
      </div>
    </Flipped>
  );
};

const AnswerPane = ({
  answer,
  points,
  index,
}: {
  answer: string;
  points: number;
  index: string;
}) => {
  return (
    <div className="flex justify-between h-full w-full items-center">
      <div
        className="text-3xl font-semibold text-white uppercase grow bg-black h-full w-full flex items-center justify-center bg-gradient-to-b  from-blue-900 to-indigo-950"
        style={{ textShadow: '6px 6px black' }}
      >
        {answer}
      </div>
      <div //TODO: Make sure this stays the same width, it currently follows text width and single digit scores look bad
        className="w-min text-5xl font-medium text-white p-2"
        style={{ textShadow: '4px 4px black' }}
      >
        {points}
      </div>
    </div>
  );
};

const AnswerPanel = ({
  id,
  answer,
  flipped,
  points,
  order,
}: {
  id: string;
  answer: string;
  points: number;
  flipped: boolean;
  order?: number;
}) => {
  return (
    <div className="border m-2 h-20 bg-gradient-to-b from-[#1182f6] to-[#594cc3]">
      {flipped ? (
        <AnswerPane answer={answer} points={points} index={id} />
      ) : (
        <RankNumber rank={order} id={id} />
      )}
    </div>
  );
};

export default AnswerPanel;
