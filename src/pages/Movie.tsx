import { useEffect, useState } from "react";
import backgroundImage from "../assets/venomblur.jpg";
import Navbar from "../components/Navbar.tsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
    addMovie,
    deleteMovie,
    deletedMovie,
    getMovies,
    saveMovie,
    updateMovie,
    updatedMovie,
} from "../reducers/MovieSlice";
import { MovieModel } from "../models/MovieModel";
import { AppDispatch } from "../store/Store.ts";

function Movie() {
    const dispatch = useDispatch<AppDispatch>();
    const movies = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(getMovies());
    }, [dispatch]);

    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [id, setId] = useState(""); // Add an id state for editing

    const handleAdd = () => {
        if (!name || !year || !image) {
            alert("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("year", year);
        formData.append("image", image); // Append the file

        dispatch(saveMovie(formData));
        resetForm();
    };

    const handleEdit = (movie: MovieModel) => {
        setName(movie.name);
        setYear(movie.year);
        setImage(movie.image);
        setId(movie.id); // Set the id for the movie being edited
        setIsEditing(true);
    };

    const handleUpdate = () => {
        if (!name || !year || !image || !id) {
            alert("All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("id", id);
        formData.append("name", name);
        formData.append("year", year);
        formData.append("image", image); // Append the file

        dispatch(updatedMovie({ id, formData }))
            .then(() => {
                resetForm();
            })
            .catch((error) => {
                console.error("Error updating movie:", error.message);
            });
    };

    const handleCancel = () => {
        resetForm();
    };

    const handleDelete = (movieId: string) => {
        dispatch(deletedMovie(movieId)); // Use movieId instead of year
    };

    const resetForm = () => {
        setName("");
        setYear("");
        setImage(null);
        setIsEditing(false);
        setId(""); // Reset the id when canceling or adding
    };

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})` }} className="min-h-screen bg-cover bg-center backdrop-blur-">
        <Navbar />

            <div className="p-6 bg-opacity-0 bg-white rounded-lg mx-auto max-w-screen-xl mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-3 border border-gray-300 rounded bg-transparent text-white text-sm w-full h-10"
                    />
                    <input
                        type="text"
                        name="year"
                        placeholder="Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="p-3 border border-gray-300 rounded bg-transparent text-white text-sm w-full h-10"
                    />
                    <input
                        type="file"
                        name="image"
                        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-gray-700 file:text-white
               text-white w-full h-10 border border-gray-300 rounded bg-transparent flex items-center justify-center"
                    />
                </div>

                <div className="mb-4 flex space-x-4">
                    {isEditing ? (
                        <>
                            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
                                Update
                            </button>
                            <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button onClick={handleAdd} className="bg-orange-500 text-white px-4 py-2 rounded">
                            Add
                        </button>
                    )}
                </div>

                <table className="min-w-full bg-transparent divide-y divide-gray-500">
                    <thead>
                    <tr className="bg-gray-100 bg-opacity-0">
                        <th className="py-2 text-white">ID</th>
                        <th className="py-2 text-white">Name</th>
                        <th className="py-2 text-white">Year</th>
                        <th className="py-2 text-white">Image</th>
                        <th className="py-2 text-white">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="space-y-4">
                    {movies.map((movie: MovieModel) => (
                        <tr key={movie.id} className="rounded-lg">
                            <td className="border px-4 py-2 text-orange-400 rounded-l-xl">{movie.id}</td>
                            <td className="border px-4 py-2 text-white">{movie.name}</td>
                            <td className="border px-4 py-2 text-white">{movie.year}</td>
                            <td className="border px-4 py-2 text-center text-center w-32">
                                {movie.image ? (
                                    <img src={movie.image} alt={movie.name} className="w-16 h-16 rounded-lg object-cover mx-auto" />
                                ) : (
                                    <span className="text-gray-400">No Image</span>
                                )}
                            </td>

                            <td className="border px-4 py-2 text-center align-middle w-32 space-x-2">
                                <button onClick={() => handleEdit(movie)} className="bg-yellow-500 text-white p-2 rounded">
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(movie.id)}
                                    className="bg-red-500 text-white p-2 rounded"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Movie;