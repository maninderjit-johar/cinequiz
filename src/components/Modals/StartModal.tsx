import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type ModalProps = {
  open: boolean;
  closeModal: (name?: string) => void;
};

export const StartModal = ({ open, closeModal }: ModalProps): JSX.Element => {
  const [name, setName] = React.useState("");

  return (
    <Dialog open={open}>
      <DialogContent className="border-white/10 bg-[#11101c] text-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">Welcome to CineQuiz</DialogTitle>
          <DialogDescription className="!mt-3 text-white/60">
            Guess the hidden movie title using the on-screen or physical keyboard.
          </DialogDescription>
        </DialogHeader>

        <Input
          className="border-white/10 bg-white/10 text-white placeholder:text-white/35"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") closeModal(name);
          }}
        />

        <DialogFooter>
          <Button className="bg-amber-300 text-slate-950 hover:bg-amber-200" onClick={() => closeModal(name)}>
            Start game
          </Button>
          <Button className="bg-white/10 text-white hover:bg-white/15" onClick={() => closeModal("Guest")}>
            Play as guest
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
