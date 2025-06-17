import { useState, useEffect } from "react"
import { toast } from "sonner"
import { LogoutComponent } from "./LogoutComponent"
import { BackButton } from "./BackButton"
import { useAuth, type User } from "@/context/AuthContext"

const API_URL = import.meta.env.VITE_REACT_APP_API_URL

const DeleteUser = () => {
    const [users, setUsers] = useState<User[]>([])
    const { fetchUsers } = useAuth()

    useEffect(() => {
        const fetchAsync = async () => {
            const users = await fetchUsers()
            setUsers(users)
        }
        fetchAsync()
    }, [fetchUsers])

    const handleDelete = async (id: string) => {
        const confirmDelete = confirm("¿Estás seguro de que quieres eliminar este usuario?")
        if (!confirmDelete) return

        try {
            const token = localStorage.getItem("token")
            const response = await fetch(`${API_URL}/api/users/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error("Error al eliminar el usuario")
            }

            setUsers(prev => prev.filter(u => u._id !== id))
            toast.success("Usuario eliminado correctamente")
        } catch (err) {
            console.error(err)
            toast.error("Error al eliminar el usuario")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
            <LogoutComponent />
            <BackButton />

            <div className="max-w-4xl mx-auto">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h2 className="text-2xl font-bold text-white mb-6">Eliminar Usuarios</h2>

                    <div className="space-y-4">
                        {users.map((user) => (
                            <div
                                key={user._id}
                                className="flex items-center justify-between bg-gray-700/50 p-4 rounded-lg border border-gray-600"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{user.name}</h3>
                                    <p className="text-gray-400">{user.email}</p>
                                    <p className="text-sm text-gray-500">Rol: {user.role}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteUser