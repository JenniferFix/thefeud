import React from "react";
import GameBg from "./GameBg";
import Gameboard from "./Gameboard";

const Game = () => {
  return (
    <GameBg
      board={<Gameboard />}
      leftTeam={0}
      rightTeam={0}
      overheadScore={0}
    />
  );
};

export default Game;
