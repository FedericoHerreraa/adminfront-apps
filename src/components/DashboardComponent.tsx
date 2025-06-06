import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

const DashboardComponent = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const sections = [
    { label: "Administración de Platos", path: "/dishes" },
    { label: "Administración de Usuarios", path: "/users" }
  ]

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-black px-6 pt-6 relative">
      
      <div className="absolute top-4 right-6 z-10">
        <button
          onClick={handleLogout}
          className="py-2 px-4 text-sm font-semibold text-white rounded-md bg-gradient-to-r from-[#B8860B] to-[#A87408] hover:brightness-110 transition-all"
        >
          Cerrar sesión
        </button>
      </div>

      
      <div className="flex flex-col items-center justify-start pt-72">
        <div className="bg-white rounded-xl p-8 shadow-lg shadow-[#B8860B]/30 w-full max-w-2xl animate-fade-in">
          <p className="text-sm text-gray-500 font-serif">
            Bienvenido, {user?.name}
          </p>
          <h1 className="text-3xl font-bold  text-gray-800 font-serif mb-6">
            Panel de Control
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections.map(({ label, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="w-full py-5 px-6 bg-gradient-to-r from-[#B8860B] to-[#A87408] text-white text-lg font-semibold rounded-lg hover:brightness-110 transition-all"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardComponent
