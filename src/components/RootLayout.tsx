import { Outlet } from "react-router"
//import { Menu } from "./Menu"
import { useLocation } from "react-router"

export function RootLayout() {
    const location = useLocation()

    const routeTitles: any = {
        "/": "Home",
        "/customer": "CustomerModel Management",
        "/item": "Item Management",
        "/place-order": "Order Management"
    }

    const title = routeTitles[location?.pathname] || "Shop"

    return (
        <div className="flex h-screen">
            <div className="flex-1 flex flex-col transition-all duration-300">

                <Outlet />

            </div>
        </div>
    )
}