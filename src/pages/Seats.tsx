import React, { useState } from 'react';
import Navbar from "../components/Navbar.tsx"; // Assuming Navbar is in the same directory

const Seats = () => {
    // Custom seat names with an additional seat per row
    const seatNames = [
        ['A1', 'A2', 'A3', 'A4', 'A5'],
        ['B1', 'B2', 'B3', 'B4', 'B5'],
        ['C1', 'C2', 'C3', 'C4', 'C5'],
        ['D1', 'D2', 'D3', 'D4', 'D5'],
    ];

    // State for seat booking
    const [seats, setSeats] = useState<boolean[][]>([
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
    ]);

    // State for tracking clicked seats
    const [clickedSeats, setClickedSeats] = useState<boolean[][]>([
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
    ]);

    // Handle seat click
    const handleSeatClick = (row: number, col: number) => {
        setSeats((prevSeats) => {
            const newSeats = [...prevSeats];
            newSeats[row][col] = !newSeats[row][col]; // Toggle booked status
            return newSeats;
        });
        setClickedSeats((prevClickedSeats) => {
            const newClickedSeats = [...prevClickedSeats];
            newClickedSeats[row][col] = true; // Mark seat as clicked
            return newClickedSeats;
        });
    };

    // Get seat color based on booking status and click status
    const getSeatColor = (isBooked: boolean, isClicked: boolean) => {
        if (isClicked) return 'bg-blue-950'; // Blue when clicked
        return isBooked ? 'bg-red-600' : 'border-gray-400'; // Red when booked, default border when available
    };

    return (
        <div className="min-h-screen bg-gray-100" style={{ backgroundImage: 'url(./src/assets/seats4.jpg)', backgroundSize: 'cover' }}>
            <Navbar />
            <div className="mt-8 max-w-screen-lg mx-auto">
                <div className="relative w-full h-24 bg-gray-800 mx-auto rounded-lg mb-32">
                    <div className="absolute inset-0 flex justify-center items-center text-white font-bold">
                        Screen
                    </div>
                </div>

                <div className="flex justify-between flex-wrap">
                    <div className="flex flex-col space-y-6 w-full sm:w-1/2">
                        {seats.slice(0, 2).map((row, rowIndex) => (
                            <div key={rowIndex} className="flex justify-center space-x-4">
                                {row.map((isBooked, colIndex) => {
                                    const seatName = seatNames[rowIndex][colIndex]; // Use custom seat name here
                                    return (
                                        <button
                                            key={colIndex}
                                            className={`w-16 h-16 rounded-lg border-2 transition-all transform ${getSeatColor(isBooked, clickedSeats[rowIndex][colIndex])} text-white font-semibold hover:scale-110 hover:opacity-80 bg-transparent`}
                                            onClick={() => handleSeatClick(rowIndex, colIndex)}
                                        >
                                            {seatName}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col space-y-6 w-full sm:w-1/2">
                        {seats.slice(2).map((row, rowIndex) => (
                            <div key={rowIndex + 2} className="flex justify-center space-x-4">
                                {row.map((isBooked, colIndex) => {
                                    const seatName = seatNames[rowIndex + 2][colIndex]; // Use custom seat name here
                                    return (
                                        <button
                                            key={colIndex}
                                            className={`w-16 h-16 rounded-lg border-2 transition-all transform ${getSeatColor(isBooked, clickedSeats[rowIndex + 2][colIndex])} text-white font-semibold hover:scale-110 hover:opacity-80 bg-transparent`}
                                            onClick={() => handleSeatClick(rowIndex + 2, colIndex)}
                                        >
                                            {seatName}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <div className="flex justify-center space-x-4 text-white">
                        <div className="w-8 h-8 bg-blue-950 rounded-full"></div>
                        <span>Booked</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Seats;
