import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TestCalendar from '../components/TestCalendar';
import '../App.css';
import battleImage from '../assets/battle.jpg';
import missionImage from '../assets/mission.jpg';
import hobbitImage from '../assets/hobbit.jpg';

const Dashboard: React.FC = () => {
    const images = [battleImage, missionImage, hobbitImage];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="page-container">
            <Navbar />
            <div className="relative w-full h-[585px] overflow-hidden">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{ backgroundImage: `url(${image})` }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                    </div>
                ))}
                <div className="absolute top-0 right-0 m-4 z-10">
                    <TestCalendar />
                </div>
                <div className="absolute bottom-0 right-0 m-4 z-10">
                    <button className="px-6 py-2 bg-green-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-700 transition duration-300">
                        Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
