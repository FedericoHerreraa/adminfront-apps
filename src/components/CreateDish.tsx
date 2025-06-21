import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { BackButton } from "./BackButton"
import { LogoutComponent } from "./LogoutComponent"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const API_URL = import.meta.env.VITE_REACT_APP_API_URL

const CreateDish = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "", 
    ingredientes: "",
    alergenos: ""
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem("token")
      const formData = new FormData()

      formData.append("name", form.name.trim())
      formData.append("description", form.description.trim())
      formData.append("price", form.price)
      formData.append("category", form.category)
      if (form.category === "principal") {
        formData.append("subcategory", form.subcategory) 
      }
      formData.append("ingredientes", form.ingredientes)
      formData.append("alergenos", form.alergenos)
      if (imageFile) formData.append("image", imageFile)

      const response = await fetch(`${API_URL}/api/dishes`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      if (!response.ok) throw new Error("Error al crear el plato")

      toast.success("Plato creado con éxito!")
      navigate("/dishes/list")
    } catch (error) {
      console.error("Error al crear plato:", error)
      toast.error("Hubo un error al crear el plato")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
      <LogoutComponent />
      <BackButton url="/dishes/list"/>

      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Crear Nuevo Plato</h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Nombre del plato
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
                Descripción
              </label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Precio
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Categoría
              </label>
              <Select name="category" value={form.category} onValueChange={(value) => setForm(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] outline-none transition-colors">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="entrada" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Entrada</SelectItem>
                  <SelectItem value="principal" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Principal</SelectItem>
                  <SelectItem value="ensalada" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Ensalada</SelectItem>
                  <SelectItem value="postre" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Postre</SelectItem>
                  <SelectItem value="bebida" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Bebida</SelectItem>
                  <SelectItem value="bebida_alcoholica" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Bebida Alcohólica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {form.category === "principal" && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Subcategoría
                </label>
                <Select name="subcategory" value={form.subcategory} onValueChange={(value) => setForm(prev => ({ ...prev, subcategory: value }))}>
                  <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] outline-none transition-colors">
                    <SelectValue placeholder="Seleccionar subcategoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="carne" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Carne Roja</SelectItem>
                    <SelectItem value="pasta" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Pasta</SelectItem>
                    <SelectItem value="vegetariano" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Carne Blanca</SelectItem>
                    <SelectItem value="pescado" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Pescado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Ingredientes
              </label>
              <input
                type="text"
                name="ingredientes"
                value={form.ingredientes}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Alérgenos
              </label>
              <input
                type="text"
                name="alergenos"
                value={form.alergenos}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Imagen
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-[#B8860B] focus:ring-1 focus:ring-[#B8860B] outline-none transition-colors file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#B8860B] file:text-white hover:file:brightness-110"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => navigate("/dishes/list")}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 cursor-pointer bg-gradient-to-r from-[#B8860B] to-[#A87408] text-white rounded-lg hover:brightness-110 transition-all"
              >
                Crear Plato
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateDish
