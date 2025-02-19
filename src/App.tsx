import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';  // Import Provider
import { store } from './store/Store';   // Import your configured Redux store
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customer from './pages/Customer.tsx';
import Films from './pages/Films.tsx';
import Seats from './pages/Seats.tsx';

function App() {
    return (
        <Provider store={store}>  {/* Wrap your Router with Provider */}
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/films" element={<Films />} />
                    <Route path="/customer" element={<Customer />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/seats" element={<Seats />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
