import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const API_URL = import.meta.env.VITE_REACT_APP_API_URL

const CreateDish = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "", // <-- Cambiado aquí
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
        formData.append("subcategory", form.subcategory) // <-- Cambiado aquí
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 py-6 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center font-serif">Crear Nuevo Plato</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre del plato"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          required
        />

        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Descripción"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          required
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Precio"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          required
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          required
        >
          <option value="">Seleccioná categoría</option>
          <option value="entrada">Entrada</option>
          <option value="principal">Principal</option>
          <option value="ensalada">Ensalada</option>
          <option value="postre">Postre</option>
          <option value="bebida">Bebida</option>
          <option value="bebida_alcoholica">Bebida Alcohólica</option>
        </select>

        {form.category === "principal" && (
          <select
            name="subcategory" // <-- Cambiado aquí
            value={form.subcategory} // <-- Cambiado aquí
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
            required
          >
            <option value="">Seleccioná subcategoría</option>
            <option value="carne">Carne Roja</option>
            <option value="pasta">Pasta</option>
            <option value="vegetariano">Carne Blanca</option>
            <option value="pescado">Pescado</option>
          </select>
        )}

        <input
          name="ingredientes"
          value={form.ingredientes}
          onChange={handleChange}
          placeholder="Ingredientes"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
        />

        <input
          name="alergenos"
          value={form.alergenos}
          onChange={handleChange}
          placeholder="Alérgenos"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-700 file:text-white hover:file:brightness-110"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-[#B8860B] to-[#A87408] text-white font-bold py-2 rounded hover:brightness-110 transition-all"
        >
          Crear Plato
        </button>
      </form>
    </div>
  )
}

export default CreateDish
