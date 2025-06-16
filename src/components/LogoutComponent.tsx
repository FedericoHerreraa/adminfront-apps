
import { useAuth } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"


export const LogoutComponent = () => {
    const navigate = useNavigate()
    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <div className="absolute top-4 right-4 z-10">
            <button
                onClick={handleLogout}
                className="py-2 px-4 text-sm cursor-pointer font-semibold text-white rounded-md bg-gradient-to-r from-[#B8860B] to-[#A87408] hover:brightness-110 transition-all"
            >
                Cerrar sesión
            </button>
        </div>
    )
}