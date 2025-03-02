import React, { useState, useEffect } from "react";
import { format, differenceInDays } from "date-fns";

const missions = [
  { title: "GRACE", description: "Understanding Grace", prompt: "Think of a time someone helped you without being asked." },
  { title: "GRACE", description: "Inner Reflection on Grace", prompt: "Close your eyes and reflect for 5 minutes on people who have shown you grace." },
  { title: "GRACE", description: "Sharing Grace", prompt: "Do something nice for someone without expecting anything back." },
  { title: "GRACE", description: "Transitioning with Grace", prompt: "Write one way you can be more kind and patient this week." },
  { title: "GRACE", description: "What Are You?", prompt: "If someone asked, 'Who are you?' what would you say?" },
];

export default function EarnThatEnergyApp() {
  const [startDate, setStartDate] = useState(null);
  const [currentMission, setCurrentMission] = useState(null);

  useEffect(() => {
    let savedDate = localStorage.getItem("eteStartDate");
    if (!savedDate) {
      const today = format(new Date(), "yyyy-MM-dd");
      localStorage.setItem("eteStartDate", today);
      savedDate = today;
    }
    setStartDate(new Date(savedDate));
  }, []);

  useEffect(() => {
    if (startDate) {
      const daysPassed = differenceInDays(new Date(), startDate);
      setCurrentMission(missions[Math.min(daysPassed, missions.length - 1)]);
    }
  }, [startDate]);

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-lg">
        {currentMission ? (
          <>
            <h1 className="text-xl font-bold">{currentMission.title}</h1>
            <h2 className="text-lg font-semibold mt-2">{currentMission.description}</h2>
            <p className="mt-4">{currentMission.prompt}</p>
          </>
        ) : (
          <p>Loading your journey...</p>
        )}
      </div>
    </div>
  );
}
