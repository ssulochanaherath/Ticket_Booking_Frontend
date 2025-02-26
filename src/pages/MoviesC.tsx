import { useEffect, useState } from "react";
import backgroundImage from "../assets/venomblur.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../reducers/MovieSlice";
import { MovieModel } from "../models/MovieModel";
import { AppDispatch } from "../store/Store.ts";
import NavbarC from "../components/NavbarC.tsx";

function Movie() {
    const dispatch = useDispatch<AppDispatch>();
    const movies = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(getMovies());
    }, [dispatch]);

    return (
        <div className="relative">
            {/* Background Wrapper */}
            <div
                className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10 transition-all duration-300"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    filter: "blur(8px)",
                    transform: "scale(1.1)",
                }}
            ></div>
            {/* Background Overlay */}
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-60 -z-5"></div>

            {/* Navbar */}
            <NavbarC />

            {/* Content */}
            <div className="p-6 bg-opacity-80 bg-black rounded-lg mx-auto max-w-screen-xl px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies.length > 0 ? (
                        movies.map((movie: MovieModel) => (
                            <div
                                key={movie.id}
                                className="relative group w-full max-w-xs mx-auto transition-all duration-300 hover:scale-105"
                            >
                                {/* Image Container */}
                                <div className="w-full h-[350px] bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform duration-300 transform group-hover:scale-105">
                                    {movie.image ? (
                                        <img
                                            src={movie.image}
                                            alt={movie.name}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-600 flex justify-center items-center text-white rounded-lg">
                                            No Image
                                        </div>
                                    )}
                                    {/* Movie Name (Inside Image) */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-center py-2 px-3">
                                        <span className="text-sm sm:text-base md:text-lg font-semibold truncate block w-full">
                                            {movie.name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-white font-semibold">Loading Movies...</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Movie;
