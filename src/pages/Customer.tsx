import {useEffect, useState} from "react"
import backgroundImage from '../assets/login.jpg';
import Navbar from "../components/Navbar.tsx";
import { FaEdit, FaTrash } from 'react-icons/fa';
import {useDispatch, useSelector} from "react-redux";
import {
    addCustomer,
    deleteCustomer,
    deletedCustomer,
    getCustomers,
    saveCustomer,
    updateCustomer,
    updatedCustomer
} from "../reducers/CustomerSlice.ts";
import {CustomerModel} from "../models/CustomerModel.ts";
import {AppDispatch} from "../store/Store.ts";

function Customer() {
    const dispatch = useDispatch<AppDispatch>();
    const customers = useSelector(state => state.customers);

    useEffect(() => {
        dispatch(getCustomers());
    }, [dispatch]);

    const [name, setName] = useState("")
    const [nic, setNic] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [isEditing, setIsEditing] = useState(false)

    const handleAdd = () => {
        if (!name || !nic || !email || !phone) {
            alert("All fields are required!")
            return
        }
        const newCustomer = new CustomerModel(name, nic, email, phone);
        dispatch(saveCustomer(newCustomer));
        resetForm();
    }

    const handleEdit = (customer: CustomerModel) => {
        setName(customer.name)
        setNic(customer.nic)
        setEmail(customer.email)
        setPhone(customer.phone)
        setIsEditing(true)
    }

    const handleUpdate = () => {
        if (!name || !nic || !email || !phone) {
            alert("All fields are required!");
            return;
        }

        const updateCust = new CustomerModel(name, nic, email, phone);

        dispatch(updatedCustomer({ email, customer: updateCust }))
            .then(() => {
                resetForm();
            })
            .catch((error) => {
                console.error("Error updating customer:", error.message);
            });
    }

    const handleCancel = () => {
        resetForm();
    }

    const handleDelete = (customerEmail: string) => {
        dispatch(deletedCustomer(customerEmail));
    }

    const resetForm = () => {
        setName("")
        setNic("")
        setEmail("")
        setPhone("")
        setIsEditing(false)
    }

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
                        placeholder="NIC"
                        value={nic}
                        onChange={(e) => setNic(e.target.value)}
                        className="p-3 border border-gray-300 rounded bg-transparent text-white text-sm w-full h-10"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-3 border border-gray-300 rounded bg-transparent text-white text-sm w-full h-10"
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="p-3 border border-gray-300 rounded bg-transparent text-white text-sm w-full h-10"
                    />
                </div>

                {/* Conditionally render Add/Update button */}
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

                {/* Table takes up full width */}
                <table className="min-w-full bg-transparent divide-y divide-gray-500">
                    <thead>
                    <tr className="bg-gray-100 bg-opacity-0">
                        <th className="py-2 text-white">ID</th>
                        <th className="py-2 text-white">Name</th>
                        <th className="py-2 text-white">NIC</th>
                        <th className="py-2 text-white">Email</th>
                        <th className="py-2 text-white">Phone</th>
                        <th className="py-2 text-white">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="space-y-4">
                    {customers.map((customer: CustomerModel) => (
                        <tr key={customer.email} className="rounded-lg">
                            <td className="border px-4 py-2 text-orange-400 rounded-l-xl">{customer.id}</td>
                            <td className="border px-4 py-2 text-white">{customer.name}</td>
                            <td className="border px-4 py-2 text-white">{customer.nic}</td>
                            <td className="border px-4 py-2 text-white">{customer.email}</td>
                            <td className="border px-4 py-2 text-white">{customer.phone}</td>
                            <td className="border px-4 py-2 flex justify-center space-x-2 rounded-r-xl">
                                <button
                                    onClick={() => handleEdit(customer)}
                                    className="bg-yellow-500 text-white p-2 rounded"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => handleDelete(customer.email)}
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

export default Customer;
