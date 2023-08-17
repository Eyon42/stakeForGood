import { usePoolTogether } from "@/hooks/PoolTogether";
import { BigNumber } from "ethers";
import { useEffect, useMemo, useState } from "react";

function Countdown() {
  const pt = usePoolTogether();
  const [endTimestamp, setEndTimestamp] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    pt.prizePoolNetwork
      .getDrawBeaconPeriod()
      .then((drawBeaconPeriod) => {
        const end = drawBeaconPeriod?.endsAtSeconds.toNumber();
        setEndTimestamp(end);
      })
      .catch((error) => console.log(error));
  }, [pt.prizePoolNetwork]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const timeLeft = endTimestamp - now;
      setTimeLeft(timeLeft);
    }, 1000);
    return () => clearInterval(interval);
  }, [endTimestamp]);

  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="text-xl">Time left to join draw:</h2>
      <span className="text-6xl">
        {endTimestamp ? (
          <DisplayTime time={timeLeft} />
        ) : (
          <DisplayTime time={0} />
        )}
      </span>
    </div>
  );
}

function formatTimeLeft(timeLeft: number) {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft - hours * 3600) / 60);
  const seconds = timeLeft - hours * 3600 - minutes * 60;
  // Pad with 0s
  const h = hours.toString().padStart(2, "0");
  const m = minutes.toString().padStart(2, "0");
  const s = seconds.toString().padStart(2, "0");
  return { h, s, m };
}

function NumberDisplay({ number }: { number: string }) {
  return (
    <span className="w-12 rounded-md bg-darkSecondary p-2 text-center text-3xl text-primary">
      {number}
    </span>
  );
}

function DisplayTime({ time }: { time: number }) {
  const { h, s, m } = formatTimeLeft(time);
  return (
    <>
      <span className="flex items-center gap-2">
        <NumberDisplay number={h[0] || "0"} />
        <NumberDisplay number={h[1] || "0"} />
        <svg
          width="4"
          height="11"
          viewBox="0 0 4 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-[-2px] h-4 w-auto"
        >
          <path
            d="M2.01953 10.1C1.5662 10.1 1.19953 9.96 0.919531 9.68C0.652865 9.4 0.519531 9.04 0.519531 8.6C0.519531 8.17333 0.652865 7.82667 0.919531 7.56C1.19953 7.28 1.5662 7.14 2.01953 7.14C2.4862 7.14 2.8462 7.28 3.09953 7.56C3.3662 7.82667 3.49953 8.17333 3.49953 8.6C3.49953 9.04 3.3662 9.4 3.09953 9.68C2.8462 9.96 2.4862 10.1 2.01953 10.1ZM2.01953 3.08C1.5662 3.08 1.19953 2.94 0.919531 2.66C0.652865 2.38 0.519531 2.02667 0.519531 1.6C0.519531 1.16 0.652865 0.806666 0.919531 0.54C1.19953 0.26 1.5662 0.12 2.01953 0.12C2.4862 0.12 2.8462 0.26 3.09953 0.54C3.3662 0.806666 3.49953 1.16 3.49953 1.6C3.49953 2.02667 3.3662 2.38 3.09953 2.66C2.8462 2.94 2.4862 3.08 2.01953 3.08Z"
            fill="white"
          />
        </svg>
        <NumberDisplay number={m[0] || "0"} />
        <NumberDisplay number={m[1] || "0"} />
        <svg
          width="4"
          height="11"
          viewBox="0 0 4 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-[-2px] h-4 w-auto"
        >
          <path
            d="M2.01953 10.1C1.5662 10.1 1.19953 9.96 0.919531 9.68C0.652865 9.4 0.519531 9.04 0.519531 8.6C0.519531 8.17333 0.652865 7.82667 0.919531 7.56C1.19953 7.28 1.5662 7.14 2.01953 7.14C2.4862 7.14 2.8462 7.28 3.09953 7.56C3.3662 7.82667 3.49953 8.17333 3.49953 8.6C3.49953 9.04 3.3662 9.4 3.09953 9.68C2.8462 9.96 2.4862 10.1 2.01953 10.1ZM2.01953 3.08C1.5662 3.08 1.19953 2.94 0.919531 2.66C0.652865 2.38 0.519531 2.02667 0.519531 1.6C0.519531 1.16 0.652865 0.806666 0.919531 0.54C1.19953 0.26 1.5662 0.12 2.01953 0.12C2.4862 0.12 2.8462 0.26 3.09953 0.54C3.3662 0.806666 3.49953 1.16 3.49953 1.6C3.49953 2.02667 3.3662 2.38 3.09953 2.66C2.8462 2.94 2.4862 3.08 2.01953 3.08Z"
            fill="white"
          />
        </svg>
        <NumberDisplay number={s[0] || "0"} />
        <NumberDisplay number={s[1] || "0"} />
      </span>
    </>
  );
}

export default Countdown;
