import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import loginImage from '../assets/login.jpg';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setError('Both fields are required.');
        } else {
            setError('');
            console.log('Logging in with:', email, password);
            // Navigate to the dashboard after login
            navigate('/dashboard'); // Redirect to dashboard
        }
    };

    return (
        <div
            className="flex justify-center items-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${loginImage})` }}
        >
            <div className="bg-transparent p-10 rounded-xl shadow-lg w-full sm:w-96 backdrop-blur-md">
                <h2 className="text-4xl font-extrabold text-center text-white mb-6">Welcome Back</h2>
                {error && <p className="text-red-400 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-4 mt-2 bg-gray-800 bg-opacity-50 text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 mt-2 bg-gray-800 bg-opacity-50 text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                    >
                        Log In
                    </button>
                </form>
                <div className="mt-4 text-center text-sm">
                    <p className="text-white">
                        Don't have an account?{' '}
                        <button onClick={() => navigate('/signup')} className="text-blue-400 hover:underline">
                            Sign up
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Login;
