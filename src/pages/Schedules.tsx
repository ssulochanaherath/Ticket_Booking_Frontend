import { useEffect, useState } from "react";
import backgroundImage from '../assets/schedule.jpg';
import Navbar from "../components/Navbar.tsx";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import {
    addSchedule,
    deleteSchedule,
    deletedSchedule,
    getSchedules,
    saveSchedule,
    updateSchedule,
    updatedSchedule
} from "../reducers/ScheduleSlice.ts";
import { AppDispatch } from "../store/Store.ts";
import { ScheduleModel } from "../models/ScheduleModel.ts";

function Schedule() {
    const dispatch = useDispatch<AppDispatch>();
    const schedules = useSelector(state => state.schedules);

    useEffect(() => {
        dispatch(getSchedules());
    }, [dispatch]);

    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const handleAdd = () => {
        if (!name || !time) {
            alert("All fields are required!");
            return;
        }
        const newSchedule = new ScheduleModel(name, time);
        dispatch(saveSchedule(newSchedule));
        resetForm();
    };

    const handleEdit = (schedule: ScheduleModel) => {
        setName(schedule.name);
        setTime(schedule.time);
        setIsEditing(true);
    };

    const handleUpdate = () => {
        if (!name || !time) {
            alert("All fields are required!");
            return;
        }

        const updatedSched = new ScheduleModel(name, time);

        dispatch(updatedSchedule({ name, schedule: updatedSched }))
            .then(() => {
                resetForm();
            })
            .catch((error) => {
                console.error("Error updating schedule:", error.message);
            });
    };

    const handleCancel = () => {
        resetForm();
    };

    const handleDelete = (scheduleName: string) => {
        dispatch(deletedSchedule(scheduleName));
    };

    const resetForm = () => {
        setName("");
        setTime("");
        setIsEditing(false);
    };

    return (
        <div
            style={{ backgroundImage: `url(${backgroundImage})` }}
            className="min-h-screen bg-cover bg-center"
        >
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
                        name="nic"
                        placeholder="Time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="p-3 border border-gray-300 rounded bg-transparent text-white text-sm w-full h-10"
                    />
                </div>

                <div className="mb-4 flex space-x-4">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleUpdate}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleAdd}
                            className="bg-orange-500 text-white px-4 py-2 rounded"
                        >
                            Add
                        </button>
                    )}
                </div>

                <table className="min-w-full bg-transparent divide-y divide-gray-500">
                    <thead>
                    <tr className="bg-gray-100 bg-opacity-0">
                        <th className="py-2 text-white">ID</th>
                        <th className="py-2 text-white">Name</th>
                        <th className="py-2 text-white">Time</th>
                        <th className="py-2 text-white">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="space-y-4">
                    {schedules.map((schedule: ScheduleModel) => (
                        <tr key={schedule.name}> {/* Ensure 'schedule.id' is unique */}
                            <td className="border px-4 py-2 text-orange-400 rounded-l-xl">{schedule.name}</td>
                            <td className="border px-4 py-2 text-white">{schedule.name}</td>
                            <td className="border px-4 py-2 text-white">{schedule.time}</td>
                            <td className="border px-4 py-2 flex justify-center space-x-2 rounded-r-xl">
                                <button
                                    onClick={() => handleEdit(schedule)}
                                    className="bg-yellow-500 text-white p-2 rounded"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(schedule.name)}
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

export default Schedule;
