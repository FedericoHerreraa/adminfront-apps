import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react"
import logo from "@/images/logo.png"
import { useAuth } from "@/context/AuthContext"

export const RegisterComponent = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { register, isLoading } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: ""
  })

  const navigate = useNavigate()

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

    try {
      await register(formData)
      cleanForm()
      navigate("/login")
    } catch (error) {
      console.error("Register failed:", error)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg shadow-[#B8860B]/30 animate-fade-in">
        <div className="flex flex-col items-center text-center">
          <img
            src={logo}
            alt="Logo de Latelier"
            className="w-20 h-20 rounded-full shadow-md mb-4 object-cover"
          />
          <h1 className="text-3xl font-bold text-gray-900 font-serif">Bienvenido a Latelier</h1>
          <p className="mt-2 text-sm text-gray-600">Ingresa tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                Nombre
              </Label>
              <Input
                type="text"
                id="name"
                required
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
                required
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
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeIcon className="w-5 h-5" />
                  ) : (
                    <EyeOffIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-gradient-to-r from-[#B8860B] to-[#A87408] hover:brightness-110 transition-all duration-300"
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
            <Link to="/login" className="font-medium text-[#B8860B] hover:text-[#A87408] transition-colors duration-200">
              Iniciar sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
