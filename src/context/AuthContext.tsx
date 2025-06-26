import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"

type AuthContextType = {
    user: User | null
    setUser: (user: User | null) => void
    login: (formData: { email: string, password: string }) => Promise<void>
    logout: () => void
    register: (formData: { email: string, name: string, password: string }) => Promise<void>
    isLoading: boolean
    fetchUsers: () => Promise<User[]>
}

export type User = {
    _id: string,
    role: string,
    name: string,
    email: string,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000"

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token")
            if (token) {
                const response = await fetch(`${API_URL}/api/users/profile`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })

                const data = await response.json()
                console.log(data)
                setUser({ _id: data._id, role: data.role, name: data.name, email: data.email })
            }
        }
        checkAuth()
    }, [])

    const fetchUsers = async () => {
        const token = localStorage.getItem("token")
        const response = await fetch(`${API_URL}/api/users`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await response.json()
        return data
    }

    const login = async (formData: { email: string, password: string }) => {
        setIsLoading(true)

        try {
            const response = await fetch(`${API_URL}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Error al iniciar sesión")
            }

            localStorage.setItem("token", data.token)

            if (data) {
                setUser({ _id: data._id, role: data.role, name: data.name, email: data.email })
                console.log(user)
            }

            toast.success("Inicio de sesión exitoso")

        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message || "Error desconocido")
            } else {
                toast.error("Error desconocido")
            }
            throw err
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    const register = async (formData: { email: string, name: string, password: string }) => {
        setIsLoading(true)

        try {
            const response = await fetch(`${API_URL}/api/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || "Error al registrarse")
            }

            toast.success("Usuario registrado correctamente 🎉")
        } catch (err: unknown) {
            if (err instanceof Error) {
                toast.error(err.message || "Error desconocido")
            } else {
                toast.error("Error desconocido")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return <AuthContext.Provider value={{ user, setUser, login, logout, register, isLoading, fetchUsers }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}