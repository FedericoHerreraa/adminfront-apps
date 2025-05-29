import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import logo from "@/images/logo.png" // ✅ Import correcto

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
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg shadow-[#B8860B]/30 animate-fade-in">
        
        <div className="flex flex-col items-center text-center">
          <img
            src={logo} // ✅ Usar variable importada
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-gradient-to-r from-[#B8860B] to-[#A87408] hover:brightness-110 transition-all duration-300"
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
            <Link
              to="/login"
              className="font-medium text-[#B8860B] hover:text-[#A87408] transition-colors duration-200"
            >
              Iniciar sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
