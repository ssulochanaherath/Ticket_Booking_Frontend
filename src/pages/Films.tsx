import React, { useState } from "react";
import Navbar from "../components/Navbar.tsx";
import { FaEdit, FaTrash } from "react-icons/fa";
import backgroundImage from "../assets/venom.jpg";

type Film = {
    id: string;
    name: string;
    year: string;
    image: string;
};

const Films: React.FC = () => {
    const [films, setFilms] = useState<Film[]>([]);
    const [formData, setFormData] = useState<Film>({
        id: "",
        name: "",
        year: "",
        image: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState<string>("");
    const [counter, setCounter] = useState<number>(1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const generateMovieId = (): string => {
        const id = `M${counter.toString().padStart(3, "0")}`;
        setCounter((prev) => prev + 1);
        return id;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            setFilms(
                films.map((film) => (film.id === currentId ? formData : film))
            );
            setIsEditing(false);
        } else {
            const newFilm = { ...formData, id: generateMovieId() };
            setFilms([...films, newFilm]);
        }
        setFormData({ id: "", name: "", year: "", image: "" });
    };

    const handleEdit = (id: string) => {
        const film = films.find((f) => f.id === id);
        if (film) {
            setFormData(film);
            setCurrentId(film.id);
            setIsEditing(true);
        }
    };

    const handleDelete = (id: string) => {
        setFilms(films.filter((film) => film.id !== id));
    };

    return (
        <div
            style={{
                position: 'relative',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                margin: 0,
            }}
        >
            {/* Blur Overlay */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backdropFilter: 'blur(2px)', // Adjust blur intensity
                    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Optional: Darken background
                }}
            ></div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <Navbar />
                <div className="container mx-auto p-4">
                    <form onSubmit={handleSubmit} className="mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Movie Name"
                                className="p-2 border border-gray-300 rounded bg-transparent text-white"
                                required
                            />
                            <input
                                type="text"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                placeholder="Year"
                                className="p-2 border border-gray-300 rounded bg-transparent text-white"
                                required
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="p-2 border border-gray-300 rounded bg-transparent text-white"
                                required={!isEditing}
                            />
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="bg-orange-500 text-white px-4 py-2 rounded mr-2"
                            >
                                {isEditing ? "Update" : "Save"}
                            </button>
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData({ id: "", name: "", year: "", image: "" });
                                    }}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>

                    <table className="min-w-full bg-transparent mt-4">
                        <thead>
                        <tr>
                            <th className="py-2 text-white">ID</th>
                            <th className="py-2 text-white">Movie Name</th>
                            <th className="py-2 text-white">Year</th>
                            <th className="py-2 text-white">Image</th>
                            <th className="py-2 text-white">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {films.map((film) => (
                            <tr key={film.id} className="border-b border-gray-600">
                                <td className="py-2 px-4 text-orange-400">{film.id}</td>
                                <td className="py-2 px-4 text-white">{film.name}</td>
                                <td className="py-2 px-4 text-white">{film.year}</td>
                                <td className="py-2 px-4 flex justify-center items-center">
                                    <img
                                        src={film.image}
                                        alt={film.name}
                                        className="w-16 h-16 rounded object-cover"
                                    />
                                </td>
                                <td className="py-2 px-4">
                                    <div className="flex justify-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(film.id)}
                                            className="bg-yellow-500 text-white p-2 rounded"
                                            aria-label="Edit"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(film.id)}
                                            className="bg-red-500 text-white p-2 rounded"
                                            aria-label="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Films;
