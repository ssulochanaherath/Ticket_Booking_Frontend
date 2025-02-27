import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTickets } from '../reducers/TicketSlice';
import { RootState } from '../store/Store'; // Adjust the import if necessary
import backgroundImage from '../assets/login.jpg';
import Navbar from "../components/Navbar.tsx";

const TicketList = () => {
    const dispatch = useDispatch();
    const tickets = useSelector((state: RootState) => state.ticket); // Adjust state path if necessary

    useEffect(() => {
        dispatch(getTickets());
    }, [dispatch]);

    return (
        <div
            style={{ backgroundImage: `url(${backgroundImage})`, minHeight: '100vh', backgroundSize: 'cover', backgroundPosition: 'center' }}
            className="overflow-auto"
        >
            <Navbar />

            <div className="p-8 bg-opacity-80 bg-black rounded-lg mx-auto max-w-screen-xl mt-10">

                {/* Ticket Table */}
                {tickets.length === 0 ? (
                    <p className="text-white text-center text-xl">No tickets booked</p>
                ) : (
                    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-800">
                            <tr>
                                <th className="py-3 px-6 text-white text-sm font-medium text-left">ID</th>
                                <th className="py-3 px-6 text-white text-sm font-medium text-left">Movie</th>
                                <th className="py-3 px-6 text-white text-sm font-medium text-left">Seat</th>
                                <th className="py-3 px-6 text-white text-sm font-medium text-left">Email</th>
                                <th className="py-3 px-6 text-white text-sm font-medium text-left">Phone</th>
                            </tr>
                            </thead>
                            <tbody className="text-sm font-medium divide-y divide-gray-300">
                            {tickets.map((ticket) => (
                                <tr key={ticket.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-gray-900">{ticket.id}</td>
                                    <td className="px-6 py-4 text-gray-900">{ticket.movie}</td>
                                    <td className="px-6 py-4 text-gray-900">{ticket.seats}</td>
                                    <td className="px-6 py-4 text-gray-900">{ticket.email}</td>
                                    <td className="px-6 py-4 text-gray-900">{ticket.phone}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketList;
