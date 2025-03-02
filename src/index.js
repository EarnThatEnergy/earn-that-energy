import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import IntroSlides from "./IntroSlides";
import missions from "./missions";
import { format, differenceInDays } from "date-fns";

function EarnThatEnergyApp() {
    const [startDate, setStartDate] = useState(null);
    const [currentMission, setCurrentMission] = useState(null);
    const [showIntro, setShowIntro] = useState(true);
    const [userResponse, setUserResponse] = useState("");

    useEffect(() => {
        const savedDate = localStorage.getItem("eteStartDate");
        if (savedDate) {
            setStartDate(new Date(savedDate));
        } else {
            const today = format(new Date(), "yyyy-MM-dd");
            localStorage.setItem("eteStartDate", today);
            setStartDate(new Date(today));
        }
    }, []);

    useEffect(() => {
        if (startDate) {
            const daysPassed = differenceInDays(new Date(), startDate);
            setCurrentMission(missions[Math.min(daysPassed, missions.length - 1)]);
        }
    }, [startDate]);

    if (showIntro) {
        return <IntroSlides onComplete={() => setShowIntro(false)} />;
    }

    const handleSubmit = () => {
        if (userResponse.trim() === "") {
            alert("Please enter your response.");
            return;
        }
        alert("Your response has been submitted!");
        setUserResponse("");
    };

    return (
        <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-xl p-6 bg-white shadow-lg rounded-lg text-center">
                {currentMission ? (
                    <>
                        <h1 className="text-xl font-bold">{currentMission.title}</h1>
                        <h2 className="text-lg font-semibold pt-2">{currentMission.description}</h2>
                        <p className="mt-4">{currentMission.prompt}</p>
                        <textarea
                            className="w-full p-2 border rounded"
                            placeholder="Write your response here..."
                            value={userResponse}
                            onChange={(e) => setUserResponse(e.target.value)}
                        />
                        <button
                            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </>
                ) : (
                    <p>Loading your journey...</p>
                )}
            </div>
        </div>
    );
}

ReactDOM.render(<EarnThatEnergyApp />, document.getElementById("root"));
