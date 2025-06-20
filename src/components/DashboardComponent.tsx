import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { LogoutComponent } from "./LogoutComponent"

const DashboardComponent = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  const sections = [
    { label: "Administración de Platos", path: "/dishes" },
    { label: "Administración de Usuarios", path: "/users" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black px-6 pt-6 relative">
      <LogoutComponent />
    
      <div className="flex flex-col items-center justify-start pt-72">
        <div className="bg-zinc-800 rounded-xl p-8 shadow-lg shadow-[#B8860B]/30 w-full max-w-2xl animate-fade-in">
          <p className="text-sm text-zinc-400 font-serif">
            Bienvenido, {user?.name}
          </p>
          <h1 className="text-3xl font-bold  text-zinc-200 font-serif mb-6">
            Panel de Control
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections.map(({ label, path }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="w-full py-5 px-6 bg-gradient-to-r cursor-pointer from-[#B8860B] to-[#A87408] text-white text-lg font-semibold rounded-lg hover:brightness-110 transition-all"
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
