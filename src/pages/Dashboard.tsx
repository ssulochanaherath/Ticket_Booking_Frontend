import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import "../App.css";

function Dashboard() {
    // Array of image paths or URLs
    const images = [
        './src/assets/login.jpg',
        'path/to/image2.jpg',
        'path/to/image3.jpg',
    ];

    // State to track the current image index
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Effect hook to change image every 3 seconds
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <div className="page-container">
            <Navbar />
            <div className="image-container">
                <img
                    src={images[currentImageIndex]}
                    alt={`Image ${currentImageIndex + 1}`}
                    className="sliding-image"
                />
            </div>
            {/* Additional content for the Dashboard can go here */}
        </div>
    );
}

export default Dashboard;
