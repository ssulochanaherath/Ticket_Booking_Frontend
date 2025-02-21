import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import backgroundImage from '../assets/login.jpg'; // Replace with your image path
import '../App.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

type Customer = {
    id: string;
    name: string;
    email: string;
    phone: string;
};

const CustomerPage: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [formData, setFormData] = useState<Customer>({
        id: '',
        name: '',
        email: '',
        phone: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentEmail, setCurrentEmail] = useState<string>('');
    const [counter, setCounter] = useState<number>(1); // Initialize counter

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const generateCustomerId = (): string => {
        const id = `C${counter.toString().padStart(3, '0')}`;
        setCounter(counter + 1); // Increment counter for next ID
        return id;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            setCustomers(
                customers.map((customer) =>
                    customer.email === currentEmail ? formData : customer
                )
            );
            setIsEditing(false);
        } else {
            const newCustomer = { ...formData, id: generateCustomerId() };
            setCustomers([...customers, newCustomer]);
        }
        setFormData({ id: '', name: '', email: '', phone: '' });
    };

    const handleEdit = (id: string) => {
        const customer = customers.find((cust) => cust.id === id);
        if (customer) {
            setFormData(customer);
            setCurrentEmail(customer.email); // Retain email for form submission
            setIsEditing(true);
        }
    };

    const handleDelete = (id: string) => {
        setCustomers(customers.filter((customer) => customer.id !== id));
    };

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                margin: 0,
            }}
        >
            <Navbar />
            <div className="container mx-auto p-4">
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Name"
                            className="p-2 border border-gray-300 rounded bg-transparent text-white text-sm"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="p-2 border border-gray-300 rounded bg-transparent text-white text-sm"
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className="p-2 border border-gray-300 rounded bg-transparent text-white text-sm"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-4 py-2 rounded mr-2"
                        >
                            {isEditing ? 'Update' : 'Save'}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData({ id: '', name: '', email: '', phone: '' });
                                }}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                <table className="min-w-full bg-transparent">
                    <thead>
                    <tr>
                        <th className="py-2 text-white">Id</th>
                        <th className="py-2 text-white">Name</th>
                        <th className="py-2 text-white">Email</th>
                        <th className="py-2 text-white">Phone</th>
                        <th className="py-2 text-white">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id} >
                            <td className="border px-4 py-2 text-orange-400">{customer.id}</td>
                            <td className="border px-4 py-2 text-white">{customer.name}</td>
                            <td className="border px-4 py-2 text-white">{customer.email}</td>
                            <td className="border px-4 py-2 text-white">{customer.phone}</td>
                            <td className="border px-4 py-2">
                                <div className="flex justify-center space-x-2">
                                    <button
                                        onClick={() => handleEdit(customer.id)}
                                        className="bg-yellow-500 text-white p-2 rounded"
                                        aria-label="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(customer.id)}
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
    );
};

export default CustomerPage;