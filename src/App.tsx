import "./App.css";
import Gameboard from "./components/Gameboard";
import { Button } from "react-daisyui";

function App() {
  return (
    <div>
      <div className="text-2xl underline">Family Feud</div>
      <Gameboard />
      <Button color="secondary">ClickMe</Button>
    </div>
  );
}

export default App;
