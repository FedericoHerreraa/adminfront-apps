import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { LogoutComponent } from "./LogoutComponent"
import { BackButton } from "./BackButton"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const API_URL = import.meta.env.VITE_REACT_APP_API_URL


const CreateUser = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    })
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            console.log(form)
            const token = localStorage.getItem("token")
            const response = await fetch(`${API_URL}/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    role: form.role
                })
            })
            
            if (!response.ok) throw new Error("Error al crear el usuario")

            toast.success("Usuario creado con éxito!")
            navigate("/users/list")
        } catch (error) {
            console.error("Error al crear usuario:", error)
            toast.error("Hubo un error al crear el usuario")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
            <LogoutComponent />
            <BackButton url="/users"/>

            <div className="max-w-2xl mx-auto">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-6">Crear Nuevo Usuario</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Nombre
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] outline-none transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] outline-none transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] outline-none transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Rol
                            </label>
                            <Select name="role" value={form.role} onValueChange={(value) => setForm(prev => ({ ...prev, role: value }))}>
                                <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] outline-none transition-colors">
                                    <SelectValue placeholder="Seleccionar rol" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-800 border-gray-700">
                                    <SelectItem value="user" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Usuario</SelectItem>
                                    <SelectItem value="admin" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Administrador</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                type="button"
                                onClick={() => navigate("/users/list")}
                                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-gradient-to-r from-[#B8860B] to-[#A87408] text-white rounded-lg hover:brightness-110 transition-all"
                            >
                                Crear Usuario
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUser