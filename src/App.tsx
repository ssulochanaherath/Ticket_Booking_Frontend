import { createBrowserRouter, RouterProvider } from "react-router"

import "./App.css"
import { RootLayout } from "./components/RootLayout"
import Customer from "./pages/Customer"
import Movie from "./pages/Movie"
import Dashboard from "./pages/Dashboard.tsx";
import Seats from "./pages/Seats.tsx";
import SeatsC from "./pages/SeatsCustomers.tsx";
import Schedules from "./pages/Schedules.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import DashboardC from "./pages/DashboardC.tsx";

function App() {
    const routes = createBrowserRouter([
        {
            path: "",
            element: <RootLayout />,
            children: [
                { path: "/", element: <Login /> },
                { path: "/signup", element: <Signup /> },
                { path: "/dashboard", element: <Dashboard />},
                { path: "/films", element: <Movie /> },
                { path: "/customer", element: <Customer /> },
                { path: "/seats", element: <Seats /> },
                { path: "/time-schedules", element: <Schedules /> },

                { path: "/dashboardc", element: <DashboardC /> },
                { path: "/seatsc", element: <SeatsC /> },
            ]
        }
    ])

    return (
        <>
            <RouterProvider router={routes} />
        </>
    )
}

export default App