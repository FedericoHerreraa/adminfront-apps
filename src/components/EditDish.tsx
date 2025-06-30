import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
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

type Dish = {
  _id?: string
  name: string
  description: string
  price: string
  category: string
  subcategory?: string 
  ingredientes: string
  alergenos: string
  image?: string
}

const EditDish = () => {
  const { id } = useParams()
  const [dish, setDish] = useState<Dish>({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "", 
    ingredientes: "",
    alergenos: "",
    image: ""
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDish = async () => {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_URL}/api/dishes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      setDish(data)
    }
    fetchDish()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setDish(prev => ({ ...prev, [name]: value }))
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
      let body: BodyInit
      const headers: HeadersInit = { Authorization: `Bearer ${token}` }

      if (imageFile) {
        const formData = new FormData()
        formData.append("name", dish.name.trim())
        formData.append("description", dish.description.trim())
        formData.append("price", String(parseFloat(dish.price)))
        formData.append("category", dish.category)
        formData.append("subcategory", dish.subcategory || "")
        formData.append("ingredientes", dish.ingredientes)
        formData.append("alergenos", dish.alergenos)
        formData.append("image", imageFile)
        body = formData
      } else {
        headers["Content-Type"] = "application/json"
        body = JSON.stringify({
          name: dish.name.trim(),
          description: dish.description.trim(),
          price: parseFloat(dish.price),
          category: dish.category,
          subcategory: dish.subcategory || "",
          ingredientes: dish.ingredientes,
          alergenos: dish.alergenos,
        })
      }

      const response = await fetch(`${API_URL}/api/dishes/${id}`, {
        method: "PUT",
        headers,
        body,
      })

      if (!response.ok) throw new Error("Error al editar el plato")

      toast.success("Plato editado con éxito!")
      navigate("/dishes/list")
    } catch (error) {
      console.error("Error al editar plato:", error)
      toast.error("Hubo un error al editar el plato")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
      <LogoutComponent />
      <BackButton url="/dishes/list"/>

      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Editar Plato</h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            {/* inputs: nombre, descripcion, precio, categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Nombre del plato</label>
              <input type="text" name="name" value={dish.name} onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Descripción</label>
              <input type="text" name="description" value={dish.description} onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Precio</label>
              <input type="number" name="price" value={dish.price} onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Categoría</label>
              <Select name="category" value={dish.category} onValueChange={(value) => setDish(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="entrada">Entrada</SelectItem>
                  <SelectItem value="principal">Principal</SelectItem>
                  <SelectItem value="ensalada">Ensalada</SelectItem>
                  <SelectItem value="postre">Postre</SelectItem>
                  <SelectItem value="bebida">Bebida</SelectItem>
                  <SelectItem value="bebida_alcoholica">Bebida Alcohólica</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {dish.category === "principal" && (
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Subcategoría</label>
                <Select name="subcategory" value={dish.subcategory || ""} onValueChange={(value) => setDish(prev => ({ ...prev, subcategory: value }))}>
                  <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Seleccionar subcategoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="carne">Carne Roja</SelectItem>
                    <SelectItem value="pasta">Pasta</SelectItem>
                    <SelectItem value="vegetariano">Carne Blanca</SelectItem>
                    <SelectItem value="pescado">Pescado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Ingredientes</label>
              <input type="text" name="ingredientes" value={dish.ingredientes} onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Alérgenos</label>
              <input type="text" name="alergenos" value={dish.alergenos} onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Imagen</label>
              <input type="file" accept="image/*" onChange={handleImageChange}
                className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600 text-white file:bg-[#B8860B] file:text-white" />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => navigate("/dishes/list")}
                className="px-4 py-2 text-gray-400 hover:text-white">Cancelar</button>
              <button type="submit"
                className="px-4 py-2 bg-gradient-to-r from-[#B8860B] to-[#A87408] text-white rounded-lg hover:brightness-110">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditDish
