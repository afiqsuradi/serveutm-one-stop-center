import { useState } from "react";

const useMultiStepForm = (steps: React.ReactNode[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [highestStepIndex, setHighestStepIndex] = useState(0);

  const next = () => {
    if (currentStepIndex >= steps.length - 1) return;
    setHighestStepIndex(currentStepIndex + 1);
    setCurrentStepIndex(currentStepIndex + 1);
  };

  const prev = () => {
    if (currentStepIndex <= 0) return;
    setCurrentStepIndex(currentStepIndex - 1);
  };

  const goto = (loc: number) => {
    if (loc > highestStepIndex || loc > steps.length - 1) return;
    setCurrentStepIndex(loc);
  };

  return {
    currentStepIndex,
    next,
    goto,
    prev,
    steps,
    step: steps[currentStepIndex],
  };
};

export default useMultiStepForm;
