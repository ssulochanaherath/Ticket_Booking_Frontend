import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveSeatsCustomer, getSeatsCustomers, resetSeatsCustomers } from '../reducers/SeatsCustomerSlice';
import Navbar from "../components/Navbar.tsx";
import { AppDispatch } from "../store/Store.ts";
import { RootState } from '../store/Store';
import backgroundImage from '../assets/seats4.jpg';

const SeatsC = () => {
    const seatNames = [
        [{ id: 'A1', name: 'A1' }, { id: 'A2', name: 'A2' }, { id: 'A3', name: 'A3' }, { id: 'A4', name: 'A4' }, { id: 'A5', name: 'A5' }],
        [{ id: 'B1', name: 'B1' }, { id: 'B2', name: 'B2' }, { id: 'B3', name: 'B3' }, { id: 'B4', name: 'B4' }, { id: 'B5', name: 'B5' }],
        [{ id: 'C1', name: 'C1' }, { id: 'C2', name: 'C2' }, { id: 'C3', name: 'C3' }, { id: 'C4', name: 'C4' }, { id: 'C5', name: 'C5' }],
        [{ id: 'D1', name: 'D1' }, { id: 'D2', name: 'D2' }, { id: 'D3', name: 'D3' }, { id: 'D4', name: 'D4' }, { id: 'D5', name: 'D5' }],
    ];

    const [seats, setSeats] = useState<{ [key: string]: boolean }>({});
    const [selectedSeat, setSelectedSeat] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getSeatsCustomers());
    }, [dispatch]);

    const availableSeats = useSelector((state: RootState) => state.seatsCustomers);

    useEffect(() => {
        const newSeatsState: { [key: string]: boolean } = {};
        availableSeats.forEach((seat) => {
            newSeatsState[seat.name] = true;
        });
        setSeats(newSeatsState);
    }, [availableSeats]);

    const handleSeatClick = (seatId: string) => {
        setSeats((prevSeats) => ({
            ...prevSeats,
            [seatId]: !prevSeats[seatId],
        }));
        setSelectedSeat(seatId); // Automatically set the selected seat when clicked
    };

    const handleBookSeat = async () => {
        if (!selectedSeat) {
            alert('Please select a seat to book');
            return;
        }

        if (seats[selectedSeat]) {
            alert('This seat is already booked');
            return;
        }

        const seatCustomer = { name: selectedSeat };

        try {
            await dispatch(saveSeatsCustomer(seatCustomer));
            await dispatch(getSeatsCustomers());

            setSeats((prevSeats) => ({
                ...prevSeats,
                [selectedSeat]: true,
            }));
        } catch (error) {
            alert('Error booking the seat. Please try again.');
        }
    };

    const handleResetSeats = async () => {
        if (window.confirm("Are you sure you want to reset all booked seats?")) {
            try {
                await dispatch(resetSeatsCustomers());
                await dispatch(getSeatsCustomers());
            } catch (error) {
                alert('Error resetting seats. Please try again.');
            }
        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
        >
            <Navbar />
            <div className="mt-8 max-w-screen-lg mx-auto px-4">
                <div className="relative w-full h-16 bg-gray-900 mx-auto rounded-lg mb-12 shadow-lg">
                    <div className="absolute inset-0 flex justify-center items-center text-white font-semibold text-xl">
                        Screen
                    </div>
                </div>

                <div className="flex justify-center items-center space-x-16">
                    {/* Left Side - Rows A & B */}
                    <div className="flex flex-col items-center space-y-10">
                        {seatNames.slice(0, 2).map((row, rowIndex) => (
                            <div key={rowIndex} className="flex justify-center space-x-4">
                                {row.map((seat) => (
                                    <button
                                        key={seat.id}
                                        className={`w-16 h-16 rounded-lg border-2 transition-all transform ${
                                            seats[seat.id] ? 'bg-blue-950' : 'border-gray-400'
                                        } text-white font-semibold hover:scale-110 hover:opacity-80`}
                                        onClick={() => handleSeatClick(seat.id)}
                                    >
                                        {seat.name}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Right Side - Rows C & D */}
                    <div className="flex flex-col items-center space-y-10">
                        {seatNames.slice(2, 4).map((row, rowIndex) => (
                            <div key={rowIndex} className="flex justify-center space-x-4">
                                {row.map((seat) => (
                                    <button
                                        key={seat.id}
                                        className={`w-16 h-16 rounded-lg border-2 transition-all transform ${
                                            seats[seat.id] ? 'bg-blue-950' : 'border-gray-400'
                                        } text-white font-semibold hover:scale-110 hover:opacity-80`}
                                        onClick={() => handleSeatClick(seat.id)}
                                    >
                                        {seat.name}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>



                <div className="flex justify-center items-center mt-6">
                    <button
                        onClick={handleResetSeats}
                        className="p-3 bg-red-600 text-white rounded-full text-lg hover:bg-red-500 transition duration-200 transform hover:scale-105 mt-16"
                    >
                        Reset All Bookings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SeatsC;
