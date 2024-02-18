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

function App() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const movieName = useAppSelector(
    (state) => state.guessedWordSlice.wordToGuess
  );

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
  console.log(movieName);

  return (
    <div className="h-lvh backdrop-blur-sm backdrop-opacity-75 bg-blend-darken contrast-125">
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
  );
}

export default App;
