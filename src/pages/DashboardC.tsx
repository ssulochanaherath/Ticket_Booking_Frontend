import React, { useState, useEffect } from 'react';
import '../App.css';
import battleImage from '../assets/battle.jpg';
import missionImage from '../assets/mission.jpg';
import hobbitImage from '../assets/hobbit.jpg';
import NavbarC from "../components/NavbarC.tsx";

// Movie Posters Data
const moviePosters = [
    { title: '1917', image: battleImage, description: 'An epic battle between heroes and villains.' },
    { title: 'Mission Impossible', image: missionImage, description: 'A high-stakes mission filled with danger.' },
    { title: 'The Hobbit', image: hobbitImage, description: 'The journey of a hobbit to save Middle-earth.' },
];

const Dashboard: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === moviePosters.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000); // Change image every 4 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="page-container">
            <NavbarC />
            <div className="relative w-full h-[585px] overflow-hidden">
                {/* Movie Posters Carousel with Smooth Transition */}
                {moviePosters.map((poster, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out ${
                            index === currentIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-95'
                        }`}
                        style={{ backgroundImage: `url(${poster.image})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    </div>
                ))}

                {/* Current Movie Title with Styling */}
                <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 z-10 text-white text-4xl font-extrabold shadow-lg">
                    {moviePosters[currentIndex].title}
                </div>

                {/* Movie Description with Smooth Appearance */}
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-10 text-white text-xl font-semibold text-center px-4">
                    <p>{moviePosters[currentIndex].description}</p>
                    {/* Optional CTA button */}
                    <button className="mt-4 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105 hover:bg-yellow-600">
                        Watch Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
