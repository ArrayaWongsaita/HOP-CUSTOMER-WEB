import { useState, useEffect, useRef } from "react";

const TripStatus = ({ svgContent, status, time }) => {
  const [leftPosition, setLeftPosition] = useState(11);
  const [circleColors, setCircleColors] = useState([
    "bg-red-500 text-white",
    "bg-white text-red-500 border-2 border-red-500",
    "bg-white text-red-500 border-2 border-red-500",
    "bg-white text-red-500 border-2 border-red-500",
  ]);
  const positions = [11, 122, 235, 345];

  const animationFrameId = useRef(null);
  const startTimeRef = useRef(null);


  useEffect(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }

    const animateToPosition = (targetPosition) => {
      const duration = time * 1000;
      startTimeRef.current = Date.now();

      const animate = () => {
        const elapsedTime = Date.now() - startTimeRef.current;
        const progress = Math.min(elapsedTime / duration, 1);
        const newPosition =
          leftPosition + (targetPosition - leftPosition) * progress;
        setLeftPosition(newPosition);

        if (progress < 1) {
          animationFrameId.current = requestAnimationFrame(animate);
        }
      };

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const updatePositionAndColor = () => {
      switch (status) {
        case 1:
          setLeftPosition(positions[0]);
          setCircleColors([
            "bg-red-500 text-white",
            "bg-white text-red-500 border-2 border-red-500",
            "bg-white text-red-500 border-2 border-red-500",
            "bg-white text-red-500 border-2 border-red-500",
          ]);
          break;
        case 2:
          animateToPosition(positions[1]);
          break;
        case 3:
          setLeftPosition(positions[1]);
          setCircleColors([
            "bg-red-500 text-white",
            "bg-red-500 text-white",
            "bg-white text-red-500 border-2 border-red-500",
            "bg-white text-red-500 border-2 border-red-500",
          ]);
          break;
        case 4:
          animateToPosition(positions[2]);
          setCircleColors([
            "bg-red-500 text-white",
            "bg-red-500 text-white",
            "bg-white text-red-500 border-2 border-red-500",
            "bg-white text-red-500 border-2 border-red-500",
          ]);
          break;
        case 5:
          setLeftPosition(positions[2]);
          setCircleColors([
            "bg-red-500 text-white",
            "bg-red-500 text-white",
            "bg-red-500 text-white",
            "bg-white text-red-500 border-2 border-red-500",
          ]);
          break;
        case 6:
          setLeftPosition(positions[3]);
          setCircleColors([
            "bg-red-500 text-white",
            "bg-red-500 text-white",
            "bg-red-500 text-white",
            "bg-red-500 text-white",
          ]);
          break;
        default:
          break;
      }
    };

    updatePositionAndColor();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [status, time, positions]);

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
                className={`w-16 h-16 rounded-full flex items-center justify-center ${circleColors[index]}`}
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
              style={{
                left: `${leftPosition}px`,
              }}
            >
              {svgContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripStatus;
