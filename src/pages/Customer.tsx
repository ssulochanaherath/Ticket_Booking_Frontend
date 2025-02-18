// src/pages/Customer.tsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';

type Customer = {
    name: string;
    email: string;
    phone: string;
    address: string;
};

const CustomerPage: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [formData, setFormData] = useState<Customer>({
        name: '',
        email: '',
        phone: '',
        address: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentEmail, setCurrentEmail] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
            setCustomers([...customers, formData]);
        }
        setFormData({ name: '', email: '', phone: '', address: '' });
    };

    const handleEdit = (email: string) => {
        const customer = customers.find((cust) => cust.email === email);
        if (customer) {
            setFormData(customer);
            setCurrentEmail(email);
            setIsEditing(true);
        }
    };

    const handleDelete = (email: string) => {
        setCustomers(customers.filter((customer) => customer.email !== email));
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4">
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Customer Name"
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Customer Email"
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Customer Phone"
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Customer Address"
                            className="p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                            {isEditing ? 'Update' : 'Save'}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData({ name: '', email: '', phone: '', address: '' });
                                }}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2">Name</th>
                        <th className="py-2">Email</th>
                        <th className="py-2">Phone</th>
                        <th className="py-2">Address</th>
                        <th className="py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.email}>
                            <td className="border px-4 py-2">{customer.name}</td>
                            <td className="border px-4 py-2">{customer.email}</td>
                            <td className="border px-4 py-2">{customer.phone}</td>
                            <td className="border px-4 py-2">{customer.address}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleEdit(customer.email)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(customer.email)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
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
