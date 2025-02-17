// Dashboard.tsx
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
        }, 5000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="page-container">
            <Navbar />
            <div className="relative w-[1000px] h-[630px] overflow-hidden">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                ))}
                <div>
                    <TestCalendar />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
