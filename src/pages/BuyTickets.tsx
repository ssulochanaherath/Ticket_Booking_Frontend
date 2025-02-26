import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavbarC from "../components/NavbarC.tsx";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../reducers/MovieSlice"; // Import your action
import { RootState } from "../store/Store"; // Import your store's RootState
import { saveSeatsCustomer, getSeatsCustomers, resetSeatsCustomers } from '../reducers/SeatsCustomerSlice'; // Import seat actions

function BuyTickets() {
    const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
    const [step, setStep] = useState(1);
    const [seats, setSeats] = useState<{ [key: string]: boolean }>({}); // Track availability of seats by ID
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);// Comma-separated string of selected seats
    const dispatch = useDispatch();
    const movies = useSelector((state: RootState) => state.movies); // Get movies from the Redux store
    const availableSeats = useSelector((state: RootState) => state.seatsCustomers); // Get available seats from Redux store
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");


    useEffect(() => {
        dispatch(getMovies()); // Dispatch action to fetch movies
    }, [dispatch]);

    // Fetch available seats (step 2)
    useEffect(() => {
        if (step === 2) {
            dispatch(getSeatsCustomers());
        }
    }, [step, dispatch]);

    // Update local seats state when availableSeats changes
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
            alert('Please select at least one seat to book');
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
            await Promise.all(selectedSeats.map(seat => dispatch(saveSeatsCustomer({ name: seat }))));
            await dispatch(getSeatsCustomers());

            setSeats((prevSeats) => {
                const updatedSeats = { ...prevSeats };
                selectedSeats.forEach((seat) => {
                    updatedSeats[seat] = true;
                });
                return updatedSeats;
            });

            setStep(3); // Move to step 3

        } catch (error) {
            alert('Error booking the seats. Please try again.');
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

    const handleFinalBooking = async () => {
        if (!selectedMovie || selectedSeats.length === 0 || !customerEmail || !customerPhone) {
            alert("Please complete all steps before booking.");
            return;
        }

        try {
            const response = await fetch("http://your-backend-api.com/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    movie: selectedMovie,
                    seats: selectedSeats,
                    email: customerEmail,
                    phone: customerPhone,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Your booking is confirmed!");
            } else {
                alert("Booking failed: " + data.message);
            }
        } catch (error) {
            console.error("Error booking seats:", error);
            alert("An error occurred while booking. Please try again.");
        }
    };


    return (
        <div className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
            <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-gradient-to-b from-gray-900 to-black"></div>
            <NavbarC />
            <div className="flex flex-col items-stretch justify-between flex-grow mt-4 p-8">
                {/* Step Navigation with Text */}
                <div className="flex justify-between mb-4">
                    <div
                        className={`cursor-pointer text-lg font-semibold ${step === 1 ? "text-blue-400" : "text-gray-400"}`}
                        onClick={() => setStep(1)} // Navigate to step 1
                    >
                        Select Movie
                    </div>
                    <div
                        className={`cursor-pointer text-lg font-semibold ${step === 2 ? "text-blue-400" : "text-gray-400"}`}
                        onClick={() => setStep(2)} // Navigate to step 2
                    >
                        Book Seat
                    </div>
                    <div
                        className={`cursor-pointer text-lg font-semibold ${step === 3 ? "text-blue-400" : "text-gray-400"}`}
                        onClick={() => setStep(3)} // Navigate to step 3
                    >
                        Customer Details
                    </div>
                    <div
                        className={`cursor-pointer text-lg font-semibold ${step === 4 ? "text-blue-400" : "text-gray-400"}`}
                        onClick={() => setStep(4)} // Navigate to step 4
                    >
                        Summary
                    </div>
                </div>

                {/* Steps Content */}

                {/*Step 01*/}

                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full bg-gray-800 p-6 rounded-xl shadow-lg flex-grow"
                >
                    {/* Steps rendering code continues */}
                    {step === 1 && (
                        <>
                            <h2 className="text-3xl font-bold mb-6 text-center text-white">
                                Choose a Movie
                            </h2>
                            <div className="space-y-4">
                                {movies.length === 0 ? (
                                    <p className="text-gray-400 text-center">Loading movies...</p>
                                ) : (
                                    movies.map((movie, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSelectMovie(movie.name)}
                                            className={`w-full px-6 py-4 rounded-xl transition-all backdrop-blur-lg shadow-md 
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
                bg-gradient-to-r from-green-500 to-green-400 disabled:from-gray-700 disabled:to-gray-600
                hover:scale-105 active:scale-95"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Next
                            </motion.button>
                        </>
                    )}

                    {/*Step 02*/}

                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full bg-gray-900 p-6 rounded-xl shadow-xl flex flex-col items-center"
                    >
                        {step === 2 && (
                            <>
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
                                        className="w-[90%] max-w-[400px] mt-6 p-3 bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold rounded-lg hover:scale-105 focus:outline-none shadow-lg transition-transform"
                                    >
                                        Book Seats
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>


                    {/*Step 03*/}

                    {step === 3 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="w-full bg-gray-800 p-6 rounded-xl shadow-lg flex-grow"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-center">Enter your Details</h2>

                            {/* Customer Information Form */}
                            <div className="mb-6">
                                <input
                                    type="email"
                                    value={customerEmail}
                                    onChange={(e) => setCustomerEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full p-3 rounded-lg border-2 border-gray-300 bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md mb-4"
                                    required
                                />
                                <input
                                    type="tel"
                                    value={customerPhone}
                                    onChange={(e) => setCustomerPhone(e.target.value)}
                                    placeholder="Enter your phone number"
                                    className="w-full p-3 rounded-lg border-2 border-gray-300 bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md"
                                    required
                                />
                            </div>
                        </motion.div>
                    )}

                    {/*Step 04*/}

                    {step === 4 && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="w-full bg-gray-800 p-6 rounded-xl shadow-lg flex-grow text-center"
                        >
                            <h2 className="text-2xl font-bold mb-6">Booking Summary</h2>

                            <div className="text-lg space-y-4">
                                <p><strong>Movie:</strong> {selectedMovie || "Not selected"}</p>
                                <p><strong>Seats:</strong> {selectedSeats.length > 0 ? selectedSeats.join(", ") : "No seats selected"}</p>
                                <p><strong>Email:</strong> {customerEmail || "Not provided"}</p>
                                <p><strong>Phone:</strong> {customerPhone || "Not provided"}</p>
                            </div>

                            <button
                                onClick={handleFinalBooking}
                                className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg transition-all hover:bg-green-600 hover:scale-105"
                            >
                                Confirm Booking
                            </button>
                        </motion.div>
                    )}

                </motion.div>
            </div>
        </div>
    );

}

export default BuyTickets;
