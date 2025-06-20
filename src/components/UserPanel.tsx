import { useNavigate } from "react-router-dom"
import { LogoutComponent } from "./LogoutComponent"
import { BackButton } from "./BackButton"

const UserPanel = () => {
  const navigate = useNavigate()

  const options = [
    { label: "Listar Usuarios", path: "/users/list" },
    { label: "Crear Usuario", path: "/users/create" },
    // { label: "Modificar Usuario", path: "/users/edit" },
    // { label: "Eliminar Usuario", path: "/users/delete" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black px-6 pt-6 relative">
      <LogoutComponent />
      <BackButton url="/dashboard"/>

      <div className="flex flex-col items-center justify-start pt-72">
        <div className="bg-zinc-800 rounded-xl p-8 shadow-lg shadow-[#B8860B]/30 w-full max-w-2xl animate-fade-in">
          <h1 className="text-3xl font-bold text-center text-zinc-300 font-serif mb-6">
            Administración de Usuarios
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {options.map(({ label, path }) => (
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

export default UserPanel
