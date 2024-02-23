import { useEffect, useState } from "react";

import "./App.css";
import Figure from "./components/Figure/Figure";
import Keyboard from "./components/Keyboard/Keyboard";
import Word from "./components/Word/Word";

import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { fetchMovieName } from "./store/GuessedWordSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StartModal } from "./components/Modals/StartModal";
import { playerInfoSlice } from "./store/PlayerInfoSlice";
import { Button } from "./components/ui/button";

function App() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(true);
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
  console.log(movieName, playerName);

  const closeStartModal = () => {
    setOpen(false);
  };

  if (open) {
    return <StartModal open={open} closeModal={closeStartModal} />;
  }

  return (
    <>
      <div className="h-lvh backdrop-blur-sm backdrop-opacity-75 bg-blend-darken contrast-125">
        <div className="w-full flex justify-end">
          <p className="text-white font-bold mt-4 mr-4 text-xl">{`Welcome ${playerName}`}</p>
        </div>
        <div className="backdrop-blur-sm max-w-screen-md mx-auto flex items-center flex-col md:h-1/2 h-[calc(50%-10%)] gap-10">
          <Figure />
        </div>

        <div className="flex justify-center my-6 flex-wrap max-w-md mx-auto">
          <Word />
        </div>

        <div className="flex justify-center">
          <Keyboard />
        </div>
      </div>
    </>
  );
}

export default App;
