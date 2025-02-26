import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavbarC from "../components/NavbarC.tsx";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../reducers/MovieSlice"; // Import your action to fetch movies

function BuyTickets() {
    const [step, setStep] = useState(1);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [customerDetails, setCustomerDetails] = useState({
        name: "",
        email: "",
    });

    const dispatch = useDispatch();

    // Select movies from the Redux store
    const movies = useSelector((state) => state.movie?.movies); // Check for state.movie before accessing movies
    const loading = useSelector((state) => state.movie?.loading); // Check for state.movie before accessing loading

    useEffect(() => {
        // Dispatch the action to fetch movies when the component mounts
        dispatch(getMovies());
    }, [dispatch]);

    const seats = ["A1", "A2", "B1", "B2"];

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
            <NavbarC />
            <div className="flex flex-col items-stretch justify-between flex-grow mt-4 p-8">
                {/* Step Navigation with Text */}
                <div className="flex justify-between mb-4">
                    <div
                        className={`cursor-pointer text-lg font-semibold ${step === 1 ? "text-blue-400" : "text-gray-400"}`}
                        onClick={() => setStep(1)}
                    >
                        Select Movie
                    </div>
                    <div
                        className={`cursor-pointer text-lg font-semibold ${step === 2 ? "text-blue-400" : "text-gray-400"}`}
                        onClick={() => setStep(2)}
                    >
                        Book Seat
                    </div>
                    <div
                        className={`cursor-pointer text-lg font-semibold ${step === 3 ? "text-blue-400" : "text-gray-400"}`}
                        onClick={() => setStep(3)}
                    >
                        Customer Details
                    </div>
                    <div
                        className={`cursor-pointer text-lg font-semibold ${step === 4 ? "text-blue-400" : "text-gray-400"}`}
                        onClick={() => setStep(4)}
                    >
                        Summary
                    </div>
                </div>

                {/* Steps Content */}
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full bg-gray-800 p-6 rounded-xl shadow-lg flex-grow"
                >
                    {step === 1 && (
                        <>
                            <h2 className="text-2xl font-bold mb-4 text-center">Choose a Movie</h2>
                            <div className="space-y-3">
                                {loading ? (
                                    <p className="text-center">Loading movies...</p>
                                ) : (
                                    Array.isArray(movies) && movies.length > 0 ? (
                                        movies.map((movie, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedMovie(movie)}
                                                className={`w-full px-5 py-3 rounded-lg transition-all ${
                                                    selectedMovie === movie
                                                        ? "bg-blue-500 text-white shadow-lg"
                                                        : "bg-gray-700 hover:bg-gray-600"
                                                }`}
                                            >
                                                {movie.name} {/* Assuming movie is an object with a name property */}
                                            </button>
                                        ))
                                    ) : (
                                        <p className="text-center">No movies available</p>
                                    )
                                )}
                            </div>
                            <motion.button
                                onClick={() => setStep(2)}
                                disabled={!selectedMovie}
                                className="w-full mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg transition-all disabled:bg-gray-600"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Next
                            </motion.button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h2 className="text-2xl font-bold mb-4 text-center">Choose a Seat</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {seats.map((seat, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedSeat(seat)}
                                        className={`px-5 py-3 rounded-lg transition-all ${
                                            selectedSeat === seat
                                                ? "bg-blue-500 text-white shadow-lg"
                                                : "bg-gray-700 hover:bg-gray-600"
                                        }`}
                                    >
                                        {seat}
                                    </button>
                                ))}
                            </div>
                            <motion.button
                                onClick={() => setStep(3)}
                                disabled={!selectedSeat}
                                className="w-full mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg transition-all disabled:bg-gray-600"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Next
                            </motion.button>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <h2 className="text-2xl font-bold mb-4 text-center">Enter Customer Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm mb-1">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={customerDetails.name}
                                        onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm mb-1">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={customerDetails.email}
                                        onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>
                            <motion.button
                                onClick={() => setStep(4)}
                                disabled={!customerDetails.name || !customerDetails.email}
                                className="w-full mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg transition-all disabled:bg-gray-600"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Next
                            </motion.button>
                        </>
                    )}

                    {step === 4 && (
                        <>
                            <h2 className="text-2xl font-bold mb-4 text-center">Confirm Your Booking</h2>
                            <div className="bg-gray-700 p-4 rounded-lg text-center mb-4">
                                <p className="text-lg">🎬 <strong>Movie:</strong> {selectedMovie}</p>
                                <p className="text-lg">🎟 <strong>Seat:</strong> {selectedSeat}</p>
                                <p className="text-lg">👤 <strong>Name:</strong> {customerDetails.name}</p>
                                <p className="text-lg">📧 <strong>Email:</strong> {customerDetails.email}</p>
                            </div>
                            <motion.button
                                onClick={() => alert("Booking Confirmed!")}
                                className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Confirm Booking
                            </motion.button>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default BuyTickets;
