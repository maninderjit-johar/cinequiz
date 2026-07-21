import { CSSProperties, useEffect, useMemo, useState } from "react";
import { Eye, Film, HelpCircle, Keyboard as KeyboardIcon, RotateCcw, Trophy } from "lucide-react";

import "./App.css";
import Figure from "./components/Figure/Figure";
import Keyboard from "./components/Keyboard/Keyboard";
import Word from "./components/Word/Word";
import { StartModal } from "./components/Modals/StartModal";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import { Switch } from "./components/ui/switch";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { fetchMovieName, resetGame, showAnswer } from "./store/GuessedWordSlice";
import { setPlayerName } from "./store/PlayerInfoSlice";

function App() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(true);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const { maxCount, source, status, usedLetters, wordToGuess } = useAppSelector(
    (state) => state.guessedWordSlice
  );
  const playerName = useAppSelector((state) => state.playerInfoSlice.value);

  useEffect(() => {
    dispatch(fetchMovieName());
  }, [dispatch]);

  const closeStartModal = (name = "Guest") => {
    dispatch(setPlayerName(name.trim() || "Guest"));
    setOpen(false);
  };

  const playAgain = () => {
    dispatch(resetGame());
    dispatch(fetchMovieName());
  };

  useEffect(() => {
    const shortcutHandler = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (open || isTyping) return;

      const key = event.key.toLowerCase();

      if (key === "1") {
        event.preventDefault();
        playAgain();
      }

      if (key === "2" && status !== "loading") {
        event.preventDefault();
        dispatch(showAnswer());
      }
    };

    window.addEventListener("keydown", shortcutHandler);

    return () => {
      window.removeEventListener("keydown", shortcutHandler);
    };
  }, [dispatch, open, status]);

  const gameStatus = useMemo(() => {
    if (status === "won") return "Solved";
    if (status === "lost") return "Revealed";
    if (status === "loading") return "Loading";
    return "In progress";
  }, [status]);
  const movieSourceLabel = source === "tmdb" ? "Live TMDB API" : "Offline demo titles";
  const confettiPieces = Array.from({ length: 34 }, (_, index) => index);

  return (
    <main className="cinema-app min-h-screen overflow-hidden bg-[#090812] text-white">
      <StartModal open={open} closeModal={closeStartModal} />
      {status === "won" && (
        <div className="confetti-layer" aria-hidden="true">
          {confettiPieces.map((piece) => (
            <span key={piece} style={{ "--i": piece } as CSSProperties} />
          ))}
        </div>
      )}

      <section className="cinema-stage relative isolate min-h-screen px-4 py-5 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_12%,rgba(251,191,36,0.22),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(244,63,94,0.22),transparent_30%),linear-gradient(135deg,#090812_0%,#151024_50%,#090812_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px] opacity-25" />
        <section className="camera-frame mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-slate-950/65 p-4 shadow-2xl shadow-rose-950/20 backdrop-blur-xl sm:p-6 lg:p-8">
            <div className="camera-hud mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.28em] text-rose-200">
                  <span className="record-dot" aria-hidden="true" /> REC · CineQuiz
                </p>
                <h1 className="mt-2 text-3xl font-black leading-none tracking-tight sm:text-5xl">
                  Guess the movie before the final frame.
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/65">
                <span className="hud-pill">{gameStatus}</span>
                <span className="hud-pill">{movieSourceLabel}</span>
                <span className="hud-pill">Player: {playerName || "Guest"}</span>
              </div>
            </div>

            <div className="director-monitor grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
              <aside className="monitor-sidebar">
                <div className="lens-copy">
                  <Film className="h-6 w-6 text-amber-200" aria-hidden="true" />
                  <p>
                    React + TypeScript game demo with Redux state, async movie loading, keyboard input,
                    reveal states, restart flow, and offline-safe demo data.
                  </p>
                </div>

                <div className="readout-grid">
                  <div>
                    <strong>{6 - maxCount}</strong>
                    <span>takes left</span>
                  </div>
                  <div>
                    <strong>{usedLetters.length}</strong>
                    <span>letters tried</span>
                  </div>
                  <div>
                    <strong>{wordToGuess ? wordToGuess.split(" ").length : "—"}</strong>
                    <span>title words</span>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Button className="gap-2 bg-amber-300 text-slate-950 hover:bg-amber-200" onClick={playAgain}>
                    <RotateCcw className="h-4 w-4" />
                    <span>New movie</span>
                    <kbd className="rounded-md bg-slate-950/15 px-2 py-0.5 text-xs font-black">1</kbd>
                  </Button>
                  <Button
                    className="gap-2 border-white/15 bg-white/10 text-white hover:bg-white/15"
                    variant="outline"
                    onClick={() => dispatch(showAnswer())}
                    disabled={status === "loading"}
                  >
                    <Eye className="h-4 w-4" />
                    <span>Reveal answer</span>
                    <kbd className="rounded-md bg-white/15 px-2 py-0.5 text-xs font-black">2</kbd>
                  </Button>
                </div>

                <div className="mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/25 px-4 py-3">
                  <KeyboardIcon className="h-4 w-4 text-white/55" />
                  <Switch
                    id="keyboard"
                    checked={showKeyboard}
                    className="data-[state=checked]:bg-amber-300 data-[state=unchecked]:bg-white/20"
                    onCheckedChange={() => setShowKeyboard((prevState) => !prevState)}
                  />
                  <Label htmlFor="keyboard" className="text-sm font-bold text-white/70">
                    On-screen keyboard
                  </Label>
                </div>
              </aside>

              <div className="monitor-main">
                <div className="projection-window rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-white/8 to-white/[0.03] p-3">
                  <Figure />
                </div>

                <div className="answer-reel my-5 flex min-h-32 items-center justify-center rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  {status === "loading" ? (
                    <p className="animate-pulse text-lg font-bold text-white/65">Loading a movie...</p>
                  ) : (
                    <Word />
                  )}
                </div>

                {status === "won" && (
                  <p className="mb-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm font-bold text-emerald-100">
                    <Trophy className="mr-2 inline h-4 w-4" />
                    Nice work — you solved it. Start another movie to keep the streak going.
                  </p>
                )}

                {status === "lost" && (
                  <p className="mb-5 rounded-2xl border border-rose-300/20 bg-rose-300/10 p-4 text-sm font-bold text-rose-100">
                    <HelpCircle className="mr-2 inline h-4 w-4" />
                    The answer was revealed. Try a new movie and beat the final frame.
                  </p>
                )}

                <div className={showKeyboard ? "block" : "hidden"}>
                  <Keyboard />
                </div>
              </div>
            </div>
          </section>
      </section>
    </main>
  );
}

export default App;
