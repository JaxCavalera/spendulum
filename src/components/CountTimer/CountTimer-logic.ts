import { SetStateAction, Dispatch } from 'react';

// Models
import { CountTimerDirection } from './CountTimer-models';

export const createTimerManager = (
  duration: number,
  setTimer: Dispatch<SetStateAction<any>>,
  countDirection?: CountTimerDirection,
) => {
  let isEnabled = true;
  let initialTime = duration;
  let durationRemaining = duration;
  let currentRafId = 0;

  const disableTimer = () => {
    cancelAnimationFrame(currentRafId);
    isEnabled = false;
  };

  const rafLoop = (timer: number) => {
    if (initialTime === duration) {
      initialTime = timer;
    }

    if (durationRemaining <= 0) {
      setTimer(0);
      cancelAnimationFrame(currentRafId);
      isEnabled = false;
      return;
    }

    durationRemaining = (initialTime + duration) - timer;

    if (isEnabled) {
      setTimer(durationRemaining);
    }

    currentRafId = requestAnimationFrame(rafLoop);
  };

  currentRafId = requestAnimationFrame(rafLoop);


  return disableTimer;
};
