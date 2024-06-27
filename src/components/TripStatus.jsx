import { useState, useEffect } from "react";

const TripStatus = ({ svgContent }) => {
  const [status, setStatus] = useState(1);
  const [leftPosition, setLeftPosition] = useState(3);
  const [moveSVG, setMoveSVG] = useState(false);
  const [time, setTime] = useState(1); // Default time is 1 second
  const [inputTime, setInputTime] = useState("");

  useEffect(() => {
    if (moveSVG) {
      const totalWidth = 84;
      const stepWidth = totalWidth / 3;
      const targetPosition = 3 + stepWidth * (status - 1);

      const duration = time * 60000;
      const startTime = Date.now();

      const animate = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const newPosition =
          leftPosition + (targetPosition - leftPosition) * progress;
        setLeftPosition(newPosition);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setMoveSVG(false);
        }
      };

      requestAnimationFrame(animate);

      return () => {
        // Cleanup if needed
      };
    }
  }, [moveSVG, time, status, leftPosition]);

  const handleChangeState = (e) => {
    e.preventDefault();
    if (status < 4) {
      setStatus((prevStatus) => prevStatus + 1);
      setMoveSVG(true);
    }
  };

  const handleTimeChange = (e) => {
    setInputTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTime = parseFloat(inputTime);
    if (!isNaN(newTime) && newTime > 0) {
      setTime(newTime);
    }
    handleChangeState(e);
  };

  const statuses = [
    { id: 1, name: "Start" },
    { id: 2, name: "You" },
    { id: 3, name: "Goal" },
    { id: 4, name: "Finish" },
  ];

  return (
    <div className="bg-black p-4">
      <div className="flex flex-col items-center">
        <div className="flex w-full items-center justify-between mb-2">
          {statuses.map((s, index) => (
            <div key={s.id} className="flex flex-col items-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  status >= s.id
                    ? "bg-red-500 text-white"
                    : "bg-white text-red-500 border-2 border-red-500"
                }`}
              >
                <span className="text-sm">{s.name}</span>
              </div>
              <div className="w-1 min-h-6 bg-white"></div>
            </div>
          ))}
        </div>
        <div className="w-full relative h-1 bg-white mt-[-8px]">
          <div className="bg-slate-400">
            <div
              className="absolute transform -translate-y-1/2 w-10 h-10 bg-white rounded-full border border-red-500 flex items-center justify-center"
              style={{ left: `${leftPosition}%` }}
            >
              {svgContent}
            </div>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-[60px] w-full flex items-center justify-center flex-col"
      >
        <div className="bg-white mb-6">
          <input
            type="number"
            placeholder="ระยะเวลาในการเดินทาง (นาที)"
            value={inputTime}
            onChange={handleTimeChange}
            min="0.1"
            step="0.1"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-white mb-6"
            disabled={status === 4}
          >
            เปลี่ยน state
          </button>
        </div>
      </form>
    </div>
  );
};

export default TripStatus;
