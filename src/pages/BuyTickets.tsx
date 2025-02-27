import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { saveTickets } from "../reducers/TicketSlice";  // Import your Redux action
import { getMovies } from "../reducers/MovieSlice"; // Import your action
import { getSeatsCustomers, saveSeatsCustomer, resetSeatsCustomers } from "../reducers/SeatsCustomerSlice";
import { RootState } from "../store/Store"; // Import your store's RootState
import { FaFilm, FaTicketAlt, FaUser, FaCheckCircle } from "react-icons/fa";
import NavbarC from "../components/NavbarC.tsx"; // Icons for step navigation

const Tickets = () => {
    const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
    const [step, setStep] = useState(1);
    const [seats, setSeats] = useState<{ [key: string]: boolean }>({}); // Track availability of seats by ID
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]); // Comma-separated string of selected seats
    const [ticket, setTicket] = useState({
        movie: "",
        seats: [],
        email: "",
        phone: "",
    });
    const dispatch = useDispatch();
    const movies = useSelector((state: RootState) => state.movies); // Get movies from Redux store
    const availableSeats = useSelector((state: RootState) => state.seatsCustomers); // Get available seats from Redux store
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");

    useEffect(() => {
        dispatch(getMovies()); // Fetch movies when the component mounts
    }, [dispatch]);

    useEffect(() => {
        if (step === 2) {
            dispatch(getSeatsCustomers()); // Fetch available seats when at step 2
        }
    }, [step, dispatch]);

    useEffect(() => {
        const newSeatsState: { [key: string]: boolean } = {};
        availableSeats.forEach((seat) => {
            newSeatsState[seat.name] = true; // Mark seat as booked if it's in the list
        });
        setSeats(newSeatsState);
    }, [availableSeats]);

    const handleSelectMovie = (movieName: string) => {
        setSelectedMovie(movieName);
    };

    const handleSeatClick = (seatId: string) => {
        setSelectedSeats((prevSeats) =>
            prevSeats.includes(seatId) ? prevSeats.filter((seat) => seat !== seatId) : [...prevSeats, seatId]
        );
    };

    const handleBookSeats = async () => {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat to book");
            return;
        }

        // Check if any selected seat is already booked
        for (const seat of selectedSeats) {
            if (seats[seat]) {
                alert(`Seat ${seat} is already booked`);
                return;
            }
        }

        try {
            // Log selected seats for debugging
            console.log("Selected Seats for booking:", selectedSeats);

            // Save selected seats to the backend
            const savePromises = selectedSeats.map((seat) => {
                console.log(`Saving seat: ${seat}`); // Log each seat being saved
                return dispatch(saveSeatsCustomer({ name: seat }));
            });

            await Promise.all(savePromises);

            // Refresh available seats
            await dispatch(getSeatsCustomers());

            // Update local state to mark the selected seats as booked
            setSeats((prevSeats) => {
                const updatedSeats = { ...prevSeats };
                selectedSeats.forEach((seat) => {
                    updatedSeats[seat] = true; // Mark the seat as booked
                });
                return updatedSeats;
            });

            setStep(3); // Move to step 3 for customer details

        } catch (error) {
            console.error("Error booking the seats:", error); // Log error for debugging
            alert("Error booking the seats. Please try again.");
        }
    };



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!customerEmail || !customerPhone) {
            alert("Please fill out all fields!");
            return;
        }

        setTicket({ ...ticket, email: customerEmail, phone: customerPhone });
        setStep(4); // Proceed to step 4
    };

    const handleFinalBooking = async () => {
        const ticketData = {
            movie: selectedMovie || "",
            seats: selectedSeats || "",
            email: customerEmail || "",
            phone: customerPhone || "",
        };

        try {
            await dispatch(saveTickets(ticketData));
            alert("Ticket added successfully!");
        } catch (error) {
            alert("Error adding ticket: " + error.message);
        }
    };

    return (
        <div className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
            <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-gradient-to-b from-gray-900 to-black"></div>
            <NavbarC />
            <div className="flex flex-col items-stretch justify-between flex-grow mt-1 p-8">
                {/* Step Navigation with Icons */}
                <div className="flex justify-between mb-6">
                    <div
                        className={`flex flex-col items-center cursor-pointer text-lg font-semibold 
                            ${step === 1 ? "text-yellow-500 scale-110" : "text-gray-400"} transition-all`}
                        onClick={() => setStep(1)}
                    >
                        <FaFilm size={24} className="mb-2" />
                        <span>Select Movie</span>
                    </div>
                    <div
                        className={`flex flex-col items-center cursor-pointer text-lg font-semibold 
                            ${step === 2 ? "text-yellow-500 scale-110" : "text-gray-400"} transition-all`}
                        onClick={() => setStep(2)}
                    >
                        <FaTicketAlt size={24} className="mb-2" />
                        <span>Book Seat</span>
                    </div>
                    <div
                        className={`flex flex-col items-center cursor-pointer text-lg font-semibold 
                            ${step === 3 ? "text-yellow-500 scale-110" : "text-gray-400"} transition-all`}
                        onClick={() => setStep(3)}
                    >
                        <FaUser size={24} className="mb-2" />
                        <span>Customer Details</span>
                    </div>
                    <div
                        className={`flex flex-col items-center cursor-pointer text-lg font-semibold 
                            ${step === 4 ? "text-yellow-500 scale-110" : "text-gray-400"} transition-all`}
                        onClick={() => setStep(4)}
                    >
                        <FaCheckCircle size={24} className="mb-2" />
                        <span>Summary</span>
                    </div>
                </div>

                {/* Step Contents */}

                {/* Step 1: Select Movie */}
                {step === 1 && (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full bg-gray-800 p-6 rounded-xl shadow-lg flex-grow"
                    >
                        <h2 className="text-3xl font-bold mb-6 text-center text-white">Choose a Movie</h2>
                        <div className="space-y-4">
                            {movies.length === 0 ? (
                                <p className="text-gray-400 text-center">Loading movies...</p>
                            ) : (
                                movies.map((movie, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSelectMovie(movie.name)}
                                        className={`w-full max-w-xs px-6 py-4 rounded-xl transition-all backdrop-blur-lg shadow-md 
                                            ${selectedMovie === movie.name
                                            ? "bg-blue-500 text-white shadow-lg scale-105"
                                            : "bg-gray-800/70 text-gray-200 hover:bg-gray-700 hover:scale-105"}`}
                                    >
                                        {movie.name}
                                    </button>
                                ))
                            )}
                        </div>
                        <motion.button
                            onClick={() => setStep(2)}
                            disabled={!selectedMovie}
                            className="w-full mt-8 px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition-all
                            bg-gradient-to-r from-blue-500 to-teal-500 hover:scale-105 active:scale-95"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Next
                        </motion.button>
                    </motion.div>
                )}

                {/* Step 2: Book Seat */}
                {step === 2 && (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full bg-gray-900 p-6 rounded-xl shadow-xl flex flex-col items-center"
                    >
                        <h2 className="text-3xl font-bold mb-6 text-center text-white">Choose a Seat</h2>

                        {/* Screen Indicator */}
                        <div className="w-[90%] h-10 bg-gray-700 rounded-t-lg flex items-center justify-center mb-8">
                            <span className="text-gray-200 text-lg font-semibold">SCREEN</span>
                        </div>

                        {/* Seat Layout */}
                        <div className="flex justify-center items-center space-x-20">
                            {/* Left Side (Rows A & B) */}
                            <div className="flex flex-col items-center space-y-10">
                                {['A', 'B'].map((row, rowIndex) => (
                                    <div key={rowIndex} className="flex justify-center space-x-6">
                                        {[1, 2, 3, 4, 5].map((seatIndex) => {
                                            const seatId = `${row}${seatIndex}`;
                                            return (
                                                <button
                                                    key={seatId}
                                                    className={`w-16 h-16 rounded-lg border-2 transition-all transform 
                                            ${
                                                        seats[seatId]
                                                            ? 'bg-blue-600 border-blue-400 shadow-lg scale-105'
                                                            : 'bg-gray-800 border-gray-500 hover:scale-110 hover:opacity-80'
                                                    } 
                                            text-white font-semibold`}
                                                    onClick={() => handleSeatClick(seatId)}
                                                >
                                                    {seatId}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>

                            {/* Right Side (Rows C & D) */}
                            <div className="flex flex-col items-center space-y-10">
                                {['C', 'D'].map((row, rowIndex) => (
                                    <div key={rowIndex} className="flex justify-center space-x-6">
                                        {[1, 2, 3, 4, 5].map((seatIndex) => {
                                            const seatId = `${row}${seatIndex}`;
                                            return (
                                                <button
                                                    key={seatId}
                                                    className={`w-16 h-16 rounded-lg border-2 transition-all transform 
                                            ${
                                                        seats[seatId]
                                                            ? 'bg-blue-600 border-blue-400 shadow-lg scale-105'
                                                            : 'bg-gray-800 border-gray-500 hover:scale-110 hover:opacity-80'
                                                    } 
                                            text-white font-semibold`}
                                                    onClick={() => handleSeatClick(seatId)}
                                                >
                                                    {seatId}
                                                </button>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Selected Seats Input & Booking Button */}
                        <div className="mt-12 text-center">
                            <input
                                id="seatInput"
                                type="text"
                                value={selectedSeats}
                                readOnly
                                className="p-2 w-[90%] max-w-[400px] rounded-lg border-2 border-gray-500 bg-gray-800 text-white text-lg text-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Click seats to select"
                            />
                            <button
                                onClick={handleBookSeats}
                                className="w-[90%] max-w-[400px] mt-6 p-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg hover:scale-105 focus:outline-none shadow-lg transition-transform"
                            >
                                Book Seats
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Customer Details */}
                {step === 3 && (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full bg-gray-900 p-8 rounded-2xl shadow-2xl flex-grow text-center"
                    >
                        <h2 className="text-4xl font-semibold text-white mb-8">Enter Your Details</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                className="w-full bg-gray-800 rounded-md p-4 mb-6 text-white placeholder-gray-400"
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                className="w-full bg-gray-800 rounded-md p-4 mb-6 text-white placeholder-gray-400"
                                required
                            />
                            <motion.button
                                type="submit"
                                className="w-full mt-6 px-6 py-3 rounded-xl text-white font-semibold shadow-lg bg-gradient-to-r from-blue-500 to-teal-500 hover:scale-105"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Next
                            </motion.button>
                        </form>
                    </motion.div>
                )}

                {/* Step 4: Final Summary and Booking */}
                {step === 4 && (
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full bg-gray-800 p-6 rounded-xl shadow-lg flex-grow text-center"
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">Final Summary</h2>
                        <p className="text-xl mb-4 text-gray-200">Movie: {selectedMovie}</p>
                        <p className="text-xl mb-4 text-gray-200">Seats: {selectedSeats.join(", ")}</p>
                        <p className="text-xl mb-4 text-gray-200">Email: {customerEmail}</p>
                        <p className="text-xl mb-4 text-gray-200">Phone: {customerPhone}</p>
                        <motion.button
                            onClick={handleFinalBooking}
                            className="w-full mt-6 px-6 py-3 rounded-xl text-white font-semibold shadow-lg bg-gradient-to-r from-blue-500 to-teal-500"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Confirm and Book Ticket
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Tickets;
