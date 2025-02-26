import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import signupImage from '../assets/login.jpg';
import { SignupModel } from "../models/SignupModel";
import { signupUser } from "../reducers/SignupSlice";
import { AppDispatch } from "../store/Store";

function Signup() {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error: reduxError, success } = useSelector((state) => state.signup); // Select loading, error, and success from state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();  // Prevent the default form submission
        if (!email || !password || !role) {
            setError("All fields are required!");  // Update local error state
            return;
        }

        // Create new SignupModel instance and dispatch to Redux
        const newSignup = new SignupModel(email, password, role);
        dispatch(signupUser(newSignup)); // Dispatch signup action
    };

    useEffect(() => {
        if (success) {
            // Navigate to the login page when signup is successful
            navigate('/');  // Redirect to the login page
        }
    }, [success, navigate]);  // Trigger when success changes

    return (
        <div
            className="flex justify-center items-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${signupImage})` }}
        >
            <div className="bg-transparent p-10 rounded-xl shadow-lg w-full sm:w-96 backdrop-blur-md">
                <h2 className="text-3xl font-extrabold text-center text-white mb-6">Sign Up</h2>
                {(error || reduxError) && <p className="text-red-400 text-center mb-4">{error || reduxError}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-white">Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-3 mt-1 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="User">User</option>
                            <option value="Customer">Customer</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
                        disabled={loading} // Disable button when loading
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                    </button>
                </form>
                <div className="mt-4 text-center text-sm">
                    <p className="text-white">
                        Already have an account?{' '}
                        <button onClick={() => navigate('/')} className="text-blue-400 hover:underline">
                            Log in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
