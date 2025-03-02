import React, { useState } from "react";

const slides = [
  { title: "Why ETE Exists", content: "Earn That Energy was created to guide you through self-improvement and mental strength." },
  { title: "Your Expectations", content: "This journey requires commitment. You will engage in daily prompts to reflect and grow." },
  { title: "Our Vision For You", content: "We envision you becoming stronger, more disciplined, and achieving a better mindset." },
  { title: "ETE Support", content: "You are not alone in this journey. Our team and community are here to help." },
  { title: "ETE Disclaimer", content: "This program is not a substitute for professional mental health care. Participate at your own pace." }
];

function IntroSlides({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete(); // Move to the first daily prompt
    }
  };

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-xl p-6 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-xl font-bold">{slides[currentSlide].title}</h1>
        <p className="mt-4">{slides[currentSlide].content}</p>
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={handleNext}
        >
          {currentSlide < slides.length - 1 ? "Next" : "Start"}
        </button>
      </div>
    </div>
  );
}

export default IntroSlides;
