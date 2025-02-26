import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === moviePosters.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000); // Change image every 4 seconds
        return () => clearInterval(interval);
    }, []);

    const handleNavigate = () => {
        navigate('/filmsc'); // Navigate to /filmsc when button is clicked
    };

    return (
        <div className="relative w-full h-screen bg-gray-900">
            <NavbarC />
            <div className="relative w-full h-full overflow-hidden">
                {/* Movie Posters Carousel with Smooth Transition */}
                {moviePosters.map((poster, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out ${
                            index === currentIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-95'
                        }`}
                        style={{ backgroundImage: `url(${poster.image})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    </div>
                ))}

                {/* Current Movie Title */}
                <div className="absolute top-[50%] left-1/2 transform -translate-x-1/2 z-10 text-white text-5xl font-extrabold drop-shadow-lg text-center px-6">
                    {moviePosters[currentIndex].title}
                </div>

                {/* Movie Description */}
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-10 text-white text-lg md:text-xl font-semibold text-center px-4">
                    <p>{moviePosters[currentIndex].description}</p>
                    <button
                        onClick={handleNavigate} // Add onClick handler to navigate
                        className="mt-6 px-8 py-3 bg-yellow-500 text-black font-semibold rounded-full shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-yellow-600 focus:outline-none"
                    >
                        Available Movies
                    </button>
                </div>

                {/* Bottom Gradient Effect */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
        </div>
    );
};

export default Dashboard;
