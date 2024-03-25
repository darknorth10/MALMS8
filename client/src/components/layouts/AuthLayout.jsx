
import { Outlet } from "react-router-dom"
import logo from "../../assets/img/logo_dark2.png"

export const AuthLayout = () => {
    return (
        <div>
            <header className="bg-gradient-to-r from-blue-800 to-blue-600 shadow px-8 py-5">
                <img src={logo} alt="logo" className="h-12" />
            </header>
            <main>
                <Outlet />
            </main>
           
        </div>
    )
}