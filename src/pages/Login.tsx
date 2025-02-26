import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import loginImage from '../assets/login.jpg';
import { fetchUserRoleByEmail } from '../reducers/SignupSlice'; // Import the action
import { useSelector } from 'react-redux'; // To get the current state
import { RootState } from '../store/Store'; // Assuming RootState is the root state type

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook
    const dispatch = useDispatch();

    // Get the role and loading/error state from Redux store
    const { role, loading, error: stateError } = useSelector(
        (state: RootState) => state.signup
    );

    // Effect to handle navigation after role is updated
    useEffect(() => {
        if (!loading && role) {
            if (role === 'User') {
                navigate('/dashboard');
            } else if (role === 'Customer') {
                navigate('/dashboardc');
            } else {
                setError('Role not recognized. Please contact support.');
            }
        }
    }, [role, loading, navigate]); // This effect runs when `role` or `loading` changes

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email === '' || password === '') {
            setError('Both fields are required.');
        } else {
            setError('');
            try {
                // Dispatch to fetch user role
                await dispatch(fetchUserRoleByEmail(email)).unwrap();
                console.log('Logged in with email:', email);
            } catch (err) {
                setError('Login failed. Please try again.');
                console.error('Login error:', err);
            }
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
                {stateError && <p className="text-red-400 text-center mb-4">{stateError}</p>} {/* Display error from Redux */}
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
