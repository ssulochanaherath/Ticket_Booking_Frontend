import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveSeatsCustomer, getSeatsCustomers, resetSeatsCustomers } from '../reducers/SeatsCustomerSlice';
import { AppDispatch } from "../store/Store.ts";
import { RootState } from '../store/Store';
import NavbarC from "../components/NavbarC.tsx"; // Assuming you have RootState for useSelector

const SeatsC = () => {
    const seatNames = [
        [{ id: 'A1', name: 'A1' }, { id: 'A2', name: 'A2' }, { id: 'A3', name: 'A3' }, { id: 'A4', name: 'A4' }, { id: 'A5', name: 'A5' }],
        [{ id: 'B1', name: 'B1' }, { id: 'B2', name: 'B2' }, { id: 'B3', name: 'B3' }, { id: 'B4', name: 'B4' }, { id: 'B5', name: 'B5' }],
        [{ id: 'C1', name: 'C1' }, { id: 'C2', name: 'C2' }, { id: 'C3', name: 'C3' }, { id: 'C4', name: 'C4' }, { id: 'C5', name: 'C5' }],
        [{ id: 'D1', name: 'D1' }, { id: 'D2', name: 'D2' }, { id: 'D3', name: 'D3' }, { id: 'D4', name: 'D4' }, { id: 'D5', name: 'D5' }],
    ];

    const [seats, setSeats] = useState<{ [key: string]: boolean }>({}); // Track availability of seats by ID
    const [selectedSeats, setSelectedSeats] = useState<string>(''); // Comma-separated string of selected seats
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
        setSelectedSeats((prevSeats) => {
            // Add the seat to the list if not already selected
            if (!prevSeats.includes(seatId)) {
                return prevSeats ? prevSeats + ',' + seatId : seatId;
            }
            return prevSeats; // If already selected, don't add again
        });
    };

    // Handle seat booking
    const handleBookSeats = async () => {
        if (!selectedSeats) {
            alert('Please select at least one seat to book');
            return;
        }

        const seatsToBook = selectedSeats.split(','); // Convert the selected seats string into an array

        // Check if any of the seats are already booked
        for (const seat of seatsToBook) {
            if (seats[seat]) {
                alert(`Seat ${seat} is already booked`);
                return;
            }
        }

        try {
            // Dispatch to save the seat customers
            const seatCustomerPromises = seatsToBook.map(seat => dispatch(saveSeatsCustomer({ name: seat })));
            await Promise.all(seatCustomerPromises);

            // Fetch the updated list of seats after booking
            await dispatch(getSeatsCustomers());

            // Mark the seats as booked locally
            setSeats((prevSeats) => {
                const updatedSeats = { ...prevSeats };
                seatsToBook.forEach((seat) => {
                    updatedSeats[seat] = true;
                });
                return updatedSeats;
            });

            // Clear the selected seats input field
            setSelectedSeats('');

        } catch (error) {
            alert('Error booking the seats. Please try again.');
        }
    };

    const handleResetSeats = async () => {
        if (window.confirm("Are you sure you want to reset all booked seats?")) {
            try {
                await dispatch(resetSeatsCustomers());
                await dispatch(getSeatsCustomers()); // Refresh seat availability
            } catch (error) {
                alert('Error resetting seats. Please try again.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100" style={{ backgroundImage: 'url(./src/assets/seats.jpg)', backgroundSize: 'cover' }}>
            <NavbarC />
            <div className="mt-8 max-w-screen-lg mx-auto">
                {/* Screen indicator */}
                <div className="relative w-full h-16 bg-gray-800 mx-auto rounded-lg mb-12">
                    <div className="absolute inset-0 flex justify-center items-center text-white font-bold">
                        Screen
                    </div>
                </div>

                {/* Seat grid rendering */}
                <div className="flex justify-center items-center space-x-16">
                    {/* Left Side - Rows A & B */}
                    <div className="flex flex-col items-center space-y-10">
                        {seatNames.slice(0, 2).map((row, rowIndex) => (
                            <div key={rowIndex} className="flex justify-center space-x-6">
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

                    {/* Right Side - Rows C & D */}
                    <div className="flex flex-col items-center space-y-10">
                        {seatNames.slice(2, 4).map((row, rowIndex) => (
                            <div key={rowIndex} className="flex justify-center space-x-6">
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
                </div>

                {/* Seat booking UI */}
                <div className="mt-12 text-center"> {/* Increased margin-top */}
                    <div className="mb-6">
                        {/*<label htmlFor="seatInput" className="block text-white text-lg font-medium mb-2">Selected Seats:</label>*/}
                        <input
                            id="seatInput"
                            type="text"
                            value={selectedSeats}
                            readOnly
                            className="p-4 h-2 w-50px max-w-md rounded-lg border-2 border-gray-300 bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md"
                            placeholder="Click seats to select"
                        />
                    </div>
                    <button
                        onClick={handleBookSeats}
                        className="w-40px max-w-md p-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-lg hover:from-blue-500 hover:to-blue-400 focus:outline-none shadow-lg transform transition-transform hover:scale-105"
                    >
                        Book Seats
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
