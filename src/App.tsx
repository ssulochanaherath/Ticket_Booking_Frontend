import { createBrowserRouter, RouterProvider } from "react-router"

import "./App.css"
import { RootLayout } from "./components/RootLayout"
import Customer from "./pages/Customer"
import Movie from "./pages/Movie"
import Dashboard from "./pages/Dashboard.tsx";
import Seats from "./pages/Seats.tsx";
//import PlaceOrder from "./pages/PlaceOrder"
//import Dashboard from "./pages/Dashboard"

function App() {
    const routes = createBrowserRouter([
        {
            path: "",
            element: <RootLayout />,
            children: [
                { path: "/", element: <Dashboard />},
                { path: "/films", element: <Movie /> },
                { path: "/customer", element: <Customer /> },
                { path: "/seats", element: <Seats /> }
                //{ path: "/place-order", element: <PlaceOrder /> }
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