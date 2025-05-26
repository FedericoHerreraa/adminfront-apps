

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Loader2 } from "lucide-react"

export const RegisterComponent = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        password: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const cleanForm = () => {
        setFormData({
            email: "",
            name: "",
            password: ""
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Hacer llamada al context aca


        setTimeout(() => {
            setIsLoading(false)
            cleanForm()
        }, 1000)
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Bienvenido a Latelier</h1>
                    <p className="mt-2 text-sm text-gray-600">Ingresa tus credenciales para continuar</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Nombre
                            </Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Juan Perez"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email
                            </Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu@email.com"
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Contraseña
                            </Label>
                            <Input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* <div className="flex items-center justify-between">
                        <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                            Recordarme
                        </label>
                        </div>

                        <div className="text-sm">
                        <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                            ¿Olvidaste tu contraseña?
                        </Link>
                        </div>
                    </div> */}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full cursor-pointer flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-950 hover:scale-105 transition-all duration-300"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                Registrando...
                            </>
                        ) : (
                            "Registrarse"
                        )}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        ¿Ya tienes una cuenta?{" "}
                        <Link to="/login" className="font-medium text-blue-950 hover:text-blue-800">
                            Iniciar sesión
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}