import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import NavbarC from "../components/NavbarC.tsx";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../reducers/MovieSlice"; // Import your action
import { RootState } from "../store/Store"; // Import your store's RootState

function BuyTickets() {
    const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
    const [step, setStep] = useState(1);

    const dispatch = useDispatch();
    const movies = useSelector((state: RootState) => state.movies); // Get movies from the Redux store

    useEffect(() => {
        dispatch(getMovies()); // Dispatch action to fetch movies
    }, [dispatch]);

    const handleSelectMovie = (movieName: string) => {
        setSelectedMovie(movieName);
    };

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
            <NavbarC />
            <div className="flex flex-col items-stretch justify-between flex-grow mt-4 p-8">
                {/* Step Navigation with Text */}
                <div className="flex justify-between mb-4">
                    <div
                        className={`cursor-pointer text-lg font-semibold ${
                            step === 1 ? "text-blue-400" : "text-gray-400"
                        }`}
                        onClick={() => setStep(1)} // Navigate to step 1
                    >
                        Select Movie
                    </div>
                    <div
                        className={`cursor-pointer text-lg font-semibold ${
                            step === 2 ? "text-blue-400" : "text-gray-400"
                        }`}
                        onClick={() => setStep(2)} // Navigate to step 2
                    >
                        Book Seat
                    </div>
                    <div
                        className={`cursor-pointer text-lg font-semibold ${
                            step === 3 ? "text-blue-400" : "text-gray-400"
                        }`}
                        onClick={() => setStep(3)} // Navigate to step 3
                    >
                        Customer Details
                    </div>
                    <div
                        className={`cursor-pointer text-lg font-semibold ${
                            step === 4 ? "text-blue-400" : "text-gray-400"
                        }`}
                        onClick={() => setStep(4)} // Navigate to step 4
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
                                {movies.length === 0 ? (
                                    <p>Loading movies...</p>
                                ) : (
                                    movies.map((movie, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSelectMovie(movie.name)}
                                            className={`w-full px-5 py-3 rounded-lg transition-all ${
                                                selectedMovie === movie.name
                                                    ? "bg-blue-500 text-white shadow-lg"
                                                    : "bg-gray-700 hover:bg-gray-600"
                                            }`}
                                        >
                                            {movie.name}
                                        </button>
                                    ))
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
                    {/* The rest of the steps... */}
                </motion.div>
            </div>
        </div>
    );
}

export default BuyTickets;
