import { useEffect, useState } from "react";

import "./App.css";
import Figure from "./components/Figure/Figure";
import Keyboard from "./components/Keyboard/Keyboard";
import Word from "./components/Word/Word";

import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { fetchMovieName } from "./store/GuessedWordSlice";

import { StartModal } from "./components/Modals/StartModal";
import { setPlayerName } from "./store/PlayerInfoSlice";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

function App() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(true);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(true);
  const movieName = useAppSelector(
    (state) => state.guessedWordSlice.wordToGuess
  );

  const playerName = useAppSelector((state) => state.playerInfoSlice.value);

  /*  useEffect(() => {
    if (movieName.trim().length === 0) {
      
      setMovieName(dispatch(fetchMovieName());
      
    }
  }, [movieName]); */

  useEffect(() => {
    if (movieName.trim().length === 0) {
      dispatch(fetchMovieName());
    }
  }, []);
  console.log(movieName, playerName, showKeyboard);

  const closeStartModal = () => {
    dispatch(setPlayerName("Guest"));
    setOpen(false);
  };

  if (open) {
    return <StartModal open={open} closeModal={closeStartModal} />;
  }

  return (
    <>
      <div className="h-lvh backdrop-blur-sm backdrop-opacity-75 bg-blend-darken contrast-125">
        <div className="w-10/12 flex justify-between mx-auto">
          <img
            src="/src/assets/logo.png"
            alt="CineQuiz"
            width={50}
            height={50}
            className="mt-4 ml-4 "
          />

          <div className="flex gap-8 items-center">
            <div className="flex items-center gap-1">
              <Switch
                id="keyboard"
                checked={showKeyboard}
                className="data-[state=checked]:bg-slate-500 data-[state=unchecked]:bg-slate-500"
                onCheckedChange={() =>
                  setShowKeyboard((prevState) => !prevState)
                }
              />
              <Label htmlFor="keyboard" className="text-white">
                On-Screen Keyboard
              </Label>
            </div>
            <p className="text-white font-bold  text-md ">{`Welcome ${playerName}`}</p>
          </div>
        </div>

        <div className="max-w-screen-md -mt-10 mx-auto flex items-center flex-col md:h-[calc(50%-10%)] h-[calc(50%-20%)] gap-10">
          <Figure />
        </div>

        <div className="flex justify-center my-6 flex-wrap max-w-md mx-auto">
          <Word />
        </div>

        <div
          className={`flex justify-center ${
            showKeyboard ? "visible" : "collapse"
          }`}
        >
          <Keyboard />
        </div>
      </div>
    </>
  );
}

export default App;
