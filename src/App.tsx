import { useState } from "react";

import "./App.css";
import Figure from "./components/Figure/Figure";
import Keyboard from "./components/Keyboard/Keyboard";
import Word from "./components/Word/Word";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="max-w-screen-md mx-auto flex items-center flex-col md:h-1/2 h-[calc(50%-10%)] gap-10">
        <Figure />
      </div>

      <div className="flex justify-center my-6 flex-wrap max-w-md mx-auto">
        <Word />
      </div>

      <div className="flex justify-center">
        <Keyboard />
      </div>
    </>
  );
}

export default App;
