import { useEffect, useState } from "react";

interface Props {
  onTimeUp: () => void;
  resetSignal: number; // signal change triggers reset
}

export default function Timer({ onTimeUp, resetSignal }: Props) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    setTimeLeft(30);
  }, [resetSignal]);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  return <div className="text-xl font-semibold text-red-600">⏳ {timeLeft}s</div>;
}
