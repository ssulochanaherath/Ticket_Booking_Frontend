import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../App.css';
import battleImage from '../assets/battle.jpg';
import missionImage from '../assets/mission.jpg';
import hobbitImage from '../assets/hobbit.jpg';

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
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="page-container">
            <Navbar />
            <div className="relative w-full h-[585px] overflow-hidden">
                {/* Movie Posters Carousel */}
                {moviePosters.map((poster, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ backgroundImage: `url(${poster.image})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    </div>
                ))}

                {/* Current Movie Title */}
                <div className="absolute top-[70%] left-1/2 transform -translate-x-1/2 z-10 text-white text-3xl font-bold">
                    {moviePosters[currentIndex].title}
                </div>

                {/* Movie Description */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 text-white text-lg font-semibold text-center px-4">
                    {moviePosters[currentIndex].description}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
