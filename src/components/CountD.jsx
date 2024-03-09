import { useEffect, useState } from "react";
import countdown from "countdown";

export default function CountD() {
  // Ramadhan is March 12, 2024 (NU)
  // make countdown to ramadhan using countdownjs and separete  the days, hours, minutes, seconds
  const [days, setDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  useEffect(() => {
    const ramadhan = new Date(2024, 3, 12); //hari selasa
    const tm = setInterval(() => {
      setDays(countdown(ramadhan).days);
      setHours(countdown(ramadhan).hours);
      setMinutes(countdown(ramadhan).minutes);
      setSeconds(countdown(ramadhan).seconds);
    }, 1000);
    return () => clearInterval(tm);
  }, []);
  return (
    <>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": days }}></span>
          </span>
          hari
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": hours }}></span>
          </span>
          jam
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": minutes }}></span>
          </span>
          menit
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": seconds }}></span>
          </span>
          detik
        </div>
      </div>
    </>
  );
}
