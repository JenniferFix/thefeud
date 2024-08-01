import React from "react";

const LocationNumber = ({ index }: { index: number }) => {
  return <div>{index}</div>;
};

const AnswerPanel = ({ idx }: { idx: number }) => {
  return (
    <div className="answer-panel border m-2">
      <div className="answer-panel-inner">
        <div className="answer-panel-front">
          <LocationNumber index={idx} />
        </div>
      </div>
    </div>
  );
};

export default AnswerPanel;
