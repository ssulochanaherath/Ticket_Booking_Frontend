import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveSeatsCustomer } from '../reducers/SeatsCustomerSlice';  // Import the saveSeatsCustomer action
import Navbar from "../components/Navbar.tsx";
import {AppDispatch} from "../store/Store.ts"; // Assuming Navbar is in the same directory

const SeatsC = () => {
    const seatNames = [
        ['A1', 'A2', 'A3', 'A4', 'A5'],
        ['B1', 'B2', 'B3', 'B4', 'B5'],
        ['C1', 'C2', 'C3', 'C4', 'C5'],
        ['D1', 'D2', 'D3', 'D4', 'D5'],
    ];

    const [seats, setSeats] = useState<boolean[][]>([
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
    ]);

    const [clickedSeats, setClickedSeats] = useState<boolean[][]>([
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
    ]);

    const [selectedSeat, setSelectedSeat] = useState<string>(''); // To store the selected seat from dropdown

    const dispatch = useDispatch<AppDispatch>();  // Get the dispatch function

    const handleSeatClick = (row: number, col: number) => {
        setSeats((prevSeats) => {
            const newSeats = [...prevSeats];
            newSeats[row][col] = !newSeats[row][col];
            return newSeats;
        });
        setClickedSeats((prevClickedSeats) => {
            const newClickedSeats = [...prevClickedSeats];
            newClickedSeats[row][col] = true;
            return newClickedSeats;
        });
    };

    const getSeatColor = (isBooked: boolean, isClicked: boolean) => {
        if (isClicked) return 'bg-blue-950';
        return isBooked ? 'bg-red-600' : 'border-gray-400';
    };

    const handleBookSeat = () => {
        if (!selectedSeat) {
            alert('Please select a seat to book');
            return;
        }

        // Extract row and column from the input seat number
        const rowLetter = selectedSeat.charAt(0).toUpperCase(); // A, B, C, D
        const colNumber = parseInt(selectedSeat.slice(1)); // 1, 2, 3, etc.

        // Map the row letter to the corresponding row index
        const rowIndex = ['A', 'B', 'C', 'D'].indexOf(rowLetter);
        const colIndex = colNumber - 1; // Convert seat number to 0-indexed

        // Check if the seat is available and within range
        if (rowIndex >= 0 && rowIndex < seats.length && colIndex >= 0 && colIndex < seats[0].length && !seats[rowIndex][colIndex]) {
            // Dispatch the action to save the seat customer (booking the seat)
            const seatCustomer = { name: selectedSeat };  // Example, you can add more details as needed
            //const seatCustomer = new SeatsCustomerModel(name)
            dispatch(saveSeatsCustomer(seatCustomer));  // Dispatch action to save

            setSeats((prevSeats) => {
                const newSeats = [...prevSeats];
                newSeats[rowIndex][colIndex] = true; // Mark seat as booked
                return newSeats;
            });

            setClickedSeats((prevClickedSeats) => {
                const newClickedSeats = [...prevClickedSeats];
                newClickedSeats[rowIndex][colIndex] = true; // Mark seat as clicked
                return newClickedSeats;
            });
        } else {
            alert('This seat is either already booked or invalid');
        }
    };


    // Generate available seats for the dropdown
    const availableSeats = [];
    seats.forEach((row, rowIndex) => {
        row.forEach((isBooked, colIndex) => {
            if (!isBooked) {
                availableSeats.push(seatNames[rowIndex][colIndex]);
            }
        });
    });

    return (
        <div className="min-h-screen bg-gray-100" style={{ backgroundImage: 'url(./src/assets/seats4.jpg)', backgroundSize: 'cover' }}>
            <Navbar />
            <div className="mt-8 max-w-screen-lg mx-auto">
                {/* Screen indicator */}
                <div className="relative w-full h-16 bg-gray-800 mx-auto rounded-lg mb-12">
                    <div className="absolute inset-0 flex justify-center items-center text-white font-bold">
                        Screen
                    </div>
                </div>

                {/* Seat grid rendering */}
                <div className="flex justify-between flex-wrap">
                    <div className="flex flex-col space-y-6 w-full sm:w-1/2">
                        {seats.slice(0, 2).map((row, rowIndex) => (
                            <div key={rowIndex} className="flex justify-center space-x-4">
                                {row.map((isBooked, colIndex) => {
                                    const seatName = seatNames[rowIndex][colIndex];
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
                                    const seatName = seatNames[rowIndex + 2][colIndex];
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

                {/* Seat booking UI */}
                <div className="mt-6 text-center">
                    <div>
                        <label htmlFor="seatSelect" className="block text-white">Select an available seat:</label>
                        <select
                            id="seatSelect"
                            value={selectedSeat}
                            onChange={(e) => setSelectedSeat(e.target.value)}
                            className="p-2 rounded border-2 border-gray-400"
                        >
                            <option value="">-- Select Seat --</option>
                            {availableSeats.map((seat) => (
                                <option key={seat} value={seat}>
                                    {seat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleBookSeat}
                        className="ml-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
                    >
                        Book
                    </button>
                </div>

                {/* Booked indicator positioned in the top-right corner */}
                <div className="absolute top-28 right-4 flex items-center space-x-2 text-white">
                    <div className="w-6 h-6 bg-blue-950 rounded-full"></div> {/* Reduced size */}
                    <span>Booked</span>
                </div>
            </div>
        </div>
    );
};

export default SeatsC;
