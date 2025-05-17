import React from "react";
import { useState, useEffect } from "react";
import Logo from "../../assets/images/LeftsideImg1.png";
import LeftSideImg2 from "../../assets/images/LeftSideImg2.png";
import FaceRecognition from "./FaceRecognition";

export default function LoginLeftSide() {
  const slides = [
    {
      title: "Welcome to Trust Id!",
      description:
        "Simplify your financial operations with our intuitive invoice and payment platform designed for modern businesses.",
      image: LeftSideImg2,
    },
    {
      title: "Automate Invoice Management",
      description:
        "Easily upload, sort, and track your invoices. Trust Id handles the heavy lifting so you can focus on what matters.",
      image: "/docs/images/carousel/carousel-2.svg",
    },
    {
      title: "Customize Approval Workflows",
      description:
        "Set up multi-level approval chains tailored to your team structure—ensure compliance without the chaos.",
      image: "/docs/images/carousel/carousel-3.svg",
    },
  ];
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  // Optional: Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 5000);
    return () => clearInterval(interval);
  }, [length]);

  const goToSlide = (index) => {
    setCurrent(index);
  };
  return (
    <aside className="w-full side-section">
      <div className="flex flex-col p-4 pt-[100px] relative h-[500px] md:h-[600px]">
        {/* {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out px-4 flex flex-col items-center ${
              current === index ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
       
            <div className=" w-full max-w-md mx-auto mb-6 mt-[40%]">
              <div className="text-2xl font-semibold ">{slide.title}</div>
              <div className=" mt-3">{slide.description}</div>
            </div>

         
            <div className="flex space-x-3 mb-6">
              {slides.map((_, dotIndex) => (
                <div
                  key={dotIndex}
                  onClick={() => goToSlide(dotIndex)}
                  className={`w-20 h-[2px] rounded-full cursor-pointer transition ${
                    current === dotIndex ? "bg-white" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>

        
            <div className="flex justify-center mt-auto">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full max-w-md object-contain"
              />
            </div>
          </div>
        ))} */}
        <FaceRecognition />
      </div>
    </aside>
  );
}
