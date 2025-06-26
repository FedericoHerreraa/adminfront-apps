import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
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
import { type User } from "@/context/AuthContext"
import { Loader2 } from "lucide-react"

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000"


const UpdateUser = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [user, setUser] = useState<User>({
        _id: "",
        name: "",
        email: "",
        role: ""
    })

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await fetch(`${API_URL}/api/users/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (!response.ok) throw new Error("Error al obtener el usuario")

                const data = await response.json()
                setUser(data)
                setLoading(false)
            } catch (err) {
                console.error("Error al obtener el usuario", err)
                toast.error("Error al obtener el usuario")
                navigate("/users/list")
            }
        }

        fetchUser()
    }, [id, navigate])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setUser(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${API_URL}/api/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(user)
            })

            if (!response.ok) throw new Error("Error al actualizar el usuario")

            toast.success("Usuario actualizado con éxito")
            navigate("/users/list")
        } catch (err) {
            console.error("Error al actualizar el usuario", err)
            toast.error("No se pudo actualizar el usuario")
        }
    }

    if (loading) return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6 flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-white" />
        </div>
    )

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
            <LogoutComponent />
            <BackButton url="/users/list"/>

            <div className="max-w-2xl mx-auto">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-6">Editar Usuario</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Nombre
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={user.name}
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
                                value={user.email}
                                onChange={handleChange}
                                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] outline-none transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Rol
                            </label>
                            <Select name="role" value={user.role} onValueChange={(value) => setUser(prev => ({ ...prev, role: value }))}>
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
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser