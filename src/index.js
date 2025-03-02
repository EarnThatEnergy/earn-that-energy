import React, { useState, useEffect } from "react";
import IntroSlides from "./IntroSlides";
import missions from "./missions";
import { format, differenceInDays } from "date-fns";

function EarnThatEnergyApp() {
    const [startDate, setStartDate] = useState(null);
    const [currentMission, setCurrentMission] = useState(null);
    const [showIntro, setShowIntro] = useState(true);
    const [userResponse, setUserResponse] = useState("");
    const [userEmail, setUserEmail] = useState("");

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
        if (userResponse.trim() === "" || userEmail.trim() === "") {
            alert("Please enter a response and your email to continue.");
            return;
        }

        // Send email logic
        fetch("/api/sendResponse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, response: userResponse, mission: currentMission }),
        })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => alert("Error sending response"));

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
                            className="w-full p-2 border rounded mt-4"
                            rows="4"
                            placeholder="Write your response here..."
                            value={userResponse}
                            onChange={(e) => setUserResponse(e.target.value)}
                        />
                        <input
                            type="email"
                            className="w-full p-2 border rounded mt-2"
                            placeholder="Enter your email..."
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
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

export default EarnThatEnergyApp;
