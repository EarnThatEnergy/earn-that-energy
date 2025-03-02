import React, { useState, useEffect } from "react";
import { format, differenceInDays } from "date-fns";
import IntroSlides from "./IntroSlides"; // Import the intro slides component

const missions = [
    { title: "GRACE", description: "Understanding Grace", prompt: "Think of a time someone helped you without being asked." },
    { title: "GRACE", description: "Inner Reflection on Grace", prompt: "Close your eyes and reflect for 5 minutes on people who have shown you grace." },
    { title: "GRACE", description: "Sharing Grace", prompt: "Do something nice for someone today without expecting anything back." },
    { title: "GRACE", description: "Transitioning with Grace", prompt: "Write one way you can be more kind and patient this week." },
    { title: "GRACE", description: "Who Are You?", prompt: "If someone asked, 'Who are you?' what would you say?" }
];

function EarnThatEnergyApp() {
    const [startDate, setStartDate] = useState(null);
    const [currentMission, setCurrentMission] = useState(null);
    const [showIntro, setShowIntro] = useState(true);
    const [userResponse, setUserResponse] = useState("");

    // Show intro slides first
    if (showIntro) {
        return <IntroSlides onComplete={() => setShowIntro(false)} />;
    }

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

    const handleSubmit = () => {
        if (userResponse.trim() === "") {
            alert("Please enter a response before submitting.");
            return;
        }

        const mailtoLink = `mailto:?subject=ETE Response&body=${encodeURIComponent(
            `Mission: ${currentMission.title}\nDescription: ${currentMission.description}\nPrompt: ${currentMission.prompt}\n\nResponse: ${userResponse}`
        )}`;

        window.location.href = mailtoLink;
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
                            rows="4"
                            placeholder="Write your response here..."
                            value={userResponse}
                            onChange={(e) => setUserResponse(e.target.value)}
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
