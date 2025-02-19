import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customer from "./pages/Customer";
import Films from "./pages/Films";
import Seats from "./pages/Seats";

function App() {
    return (
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
    );
}

export default App;
