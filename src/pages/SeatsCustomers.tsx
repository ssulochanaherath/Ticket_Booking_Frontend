import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveSeatsCustomer, getSeatsCustomers } from '../reducers/SeatsCustomerSlice';
import Navbar from "../components/Navbar.tsx";
import { AppDispatch } from "../store/Store.ts";
import { RootState } from '../store/Store'; // Assuming you have RootState for useSelector

const SeatsC = () => {
    const seatNames = [
        [{ id: 'A1', name: 'A1' }, { id: 'A2', name: 'A2' }, { id: 'A3', name: 'A3' }, { id: 'A4', name: 'A4' }, { id: 'A5', name: 'A5' }],
        [{ id: 'B1', name: 'B1' }, { id: 'B2', name: 'B2' }, { id: 'B3', name: 'B3' }, { id: 'B4', name: 'B4' }, { id: 'B5', name: 'B5' }],
        [{ id: 'C1', name: 'C1' }, { id: 'C2', name: 'C2' }, { id: 'C3', name: 'C3' }, { id: 'C4', name: 'C4' }, { id: 'C5', name: 'C5' }],
        [{ id: 'D1', name: 'D1' }, { id: 'D2', name: 'D2' }, { id: 'D3', name: 'D3' }, { id: 'D4', name: 'D4' }, { id: 'D5', name: 'D5' }],
    ];

    const [seats, setSeats] = useState<{ [key: string]: boolean }>({}); // Track availability of seats by ID
    const [selectedSeat, setSelectedSeat] = useState<string>(''); // Selected seat ID for booking
    const dispatch = useDispatch<AppDispatch>();

    // Fetch seats customers (available seats) on component mount
    useEffect(() => {
        dispatch(getSeatsCustomers());
    }, [dispatch]);

    // Get the list of seats from the Redux store
    const availableSeats = useSelector((state: RootState) => state.seatsCustomers); // Get available seats from Redux

    useEffect(() => {
        // Update the local seats state based on the fetched data
        const newSeatsState: { [key: string]: boolean } = {};
        availableSeats.forEach((seat) => {
            newSeatsState[seat.name] = true; // Mark seat as booked if it's in the list
        });
        setSeats(newSeatsState); // Update the local seat state
    }, [availableSeats]);

    // Handle seat click to toggle seat selection
    const handleSeatClick = (seatId: string) => {
        setSeats((prevSeats) => ({
            ...prevSeats,
            [seatId]: !prevSeats[seatId], // Toggle the seat availability
        }));
    };

    // Handle seat booking
    const handleBookSeat = async () => {
        if (!selectedSeat) {
            alert('Please select a seat to book');
            return;
        }

        // Check if the seat is already booked
        if (seats[selectedSeat]) {
            alert('This seat is already booked');
            return;
        }

        const seatCustomer = { name: selectedSeat };

        try {
            // Dispatch to save the seat customer
            await dispatch(saveSeatsCustomer(seatCustomer));

            // Fetch the updated list of seats after booking
            await dispatch(getSeatsCustomers());

            // Mark the seat as booked locally
            setSeats((prevSeats) => ({
                ...prevSeats,
                [selectedSeat]: true,
            }));

        } catch (error) {
            alert('Error booking the seat. Please try again.');
        }
    };

    // Generate available seats for the dropdown
    const availableSeatsForDropdown = [];
    seatNames.forEach((row) => {
        row.forEach((seat) => {
            if (!seats[seat.id]) { // Seat is available
                availableSeatsForDropdown.push(seat.id);
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
                    {seatNames.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex justify-center space-x-4">
                            {row.map((seat) => (
                                <button
                                    key={seat.id}
                                    className={`w-16 h-16 rounded-lg border-2 transition-all transform ${seats[seat.id] ? 'bg-blue-950' : 'border-gray-400'} text-white font-semibold hover:scale-110 hover:opacity-80`}
                                    onClick={() => handleSeatClick(seat.id)}
                                >
                                    {seat.name}
                                </button>
                            ))}
                        </div>
                    ))}
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
                            {availableSeatsForDropdown.map((seat) => (
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

                {/* Booked indicator */}
                <div className="absolute top-28 right-4 flex items-center space-x-2 text-white">
                    <div className="w-6 h-6 bg-blue-950 rounded-full"></div> {/* Reduced size */}
                    <span>Booked</span>
                </div>
            </div>
        </div>
    );
};

export default SeatsC;
