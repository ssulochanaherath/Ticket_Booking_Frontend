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
                className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat -z-10"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            ></div>

            <NavbarC />

            {/* Content */}
            <div className="p-6 bg-opacity-0 bg-white rounded-lg mx-auto max-w-screen-xl mt-10 ml-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies.map((movie: MovieModel) => (
                        <div key={movie.id} className="relative group w-[200px]">
                            {/* Image Container */}
                            <div className="w-full h-[300px] sm:h-[350px] bg-gray-800 rounded-lg overflow-hidden relative">
                                {movie.image ? (
                                    <img
                                        src={movie.image}
                                        alt={movie.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-600 flex justify-center items-center text-white">
                                        No Image
                                    </div>
                                )}
                                {/* Movie Name (Inside Image) */}
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-center py-2 px-2">
                                    <span className="text-sm sm:text-base md:text-lg truncate block w-full">
                                        {movie.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Movie;
