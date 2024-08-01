import { useState } from "react";
import "./App.css";
import Gameboard from "./components/Gameboard";

function App() {
  return (
    <div>
      <div className="text-2xl underline">Family Feud</div>
      <Gameboard />
    </div>
  );
}

export default App;
