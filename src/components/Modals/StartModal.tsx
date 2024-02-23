import React, {
  Dispatch,
  FunctionComponent,
  MouseEvent,
  SetStateAction,
  useEffect,
} from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/hooks/hooks";
import { setPlayerName } from "@/store/PlayerInfoSlice";

type ModalProps = {
  open: boolean;
  closeModal: () => void;
};

export const StartModal = ({ open, closeModal }: ModalProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const [name, setName] = React.useState("");
  useEffect(() => {
    const closeButton = document.querySelector("svg");
    if (closeButton) {
      closeButton.style.display = "none";
    }
  }, []);

  const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const startClickHandler = (e: MouseEvent) => {
    dispatch(setPlayerName(name));
    closeModal();
  };
  //const sta;

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you a movie fan ? Let's take this CineQuiz!
          </DialogTitle>
          <DialogDescription className="!mt-4">
            <Input
              className="mt-2"
              placeholder="Your Name"
              onChange={nameChangeHandler}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="md:w-2/6 inline-block" onClick={startClickHandler}>
            Start{" "}
          </Button>
          <Button
            className="md:w-2/6 bg-gray-500 inline-block "
            onClick={closeModal}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
