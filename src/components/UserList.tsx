import { useState, useEffect } from "react"
import { toast } from "sonner"
import { LogoutComponent } from "./LogoutComponent"
import { BackButton } from "./BackButton"
import { Pencil, Trash2 } from "lucide-react"
import { useAuth, type User } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000"


export default function UserList() {
    const [users, setUsers] = useState<User[]>([])
    const [filtered, setFiltered] = useState<User[]>([])
    const [role, setRole] = useState("")
    const { fetchUsers } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchAsync = async () => {
            const users = await fetchUsers()
            setUsers(users)
            setFiltered(users)
        }
        fetchAsync()
    }, [fetchUsers])

    const handleRoleChange = (value: string) => {
        setRole(value)

        if (value === "todos") {
            setFiltered(users)
        } else {
            const filteredList = users.filter((u) => u.role === value)
            setFiltered(filteredList)
        }
    }

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
            setFiltered(prev => prev.filter(u => u._id !== id))
            toast.success("Usuario eliminado correctamente")
        } catch (err) {
            console.error(err)
            toast.error("Error al eliminar el usuario")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
            <LogoutComponent />
            <BackButton url="/users"/>

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center gap-8 mb-12">
                    <h1 className="text-4xl font-bold text-white mb-2">Usuarios</h1>
                    <p className="text-gray-400 text-lg">Administra los usuarios del sistema</p>

                </div>

                <div className="w-full mb-5 flex justify-between">
                    <Select value={role} onValueChange={handleRoleChange}>
                        <SelectTrigger className="w-full max-w-xs bg-gray-800/50 text-white border-gray-700 hover:border-[#B8860B] transition-colors">
                            <SelectValue placeholder="Todos los roles" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                            <SelectItem value="todos" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Todos los roles</SelectItem>
                            <SelectItem value="admin" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Administrador</SelectItem>
                            <SelectItem value="user" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Usuario</SelectItem>
                        </SelectContent>
                    </Select>

                    <button
                        onClick={() => navigate("/users/create")}
                        className="px-4 py-2 cursor-pointer bg-gradient-to-r from-[#B8860B] to-[#A87408] text-white rounded-lg hover:brightness-110 transition-all"
                    >
                        Crear Usuario
                    </button>
                </div>

                <div className="bg-gray-800/50 rounded-xl border border-gray-700">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-gray-700/50 border-zinc-600">
                                <TableHead className="text-white">Nombre</TableHead>
                                <TableHead className="text-white">Email</TableHead>
                                <TableHead className="text-white">Rol</TableHead>
                                <TableHead className="text-right text-white">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((user) => (
                                <TableRow key={user._id} className="hover:bg-gray-700/50 border-zinc-600">
                                    <TableCell className="font-medium text-white">{user.name}</TableCell>
                                    <TableCell className="text-gray-400">{user.email}</TableCell>
                                    <TableCell>
                                        <span className={`px-3 py-1 text-sm rounded-full ${user.role === "admin" ? "bg-[#1E3A8A] text-[#bfbfbf]" : "bg-[#D4AF37]/20 text-[#B8860B]"} `}>
                                            {user.role}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => window.location.href = `/users/edit/${user._id}`}
                                                className="p-2 text-gray-400 cursor-pointer hover:text-[#D4AF37] transition-colors"
                                            >
                                                <Pencil className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="p-2 text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}