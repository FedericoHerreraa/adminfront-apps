import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CreateDish = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: ""
  })
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/dishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          category: form.category
        })
      })

      if (!response.ok) throw new Error("Error al crear el plato")

      alert("Plato creado con éxito!")
      navigate("/dishes/list")
    } catch (error) {
      console.error("Error al crear plato:", error)
      alert("Hubo un error al crear el plato")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
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
          <option value="postre">Postre</option>
          <option value="bebida">Bebida</option>
        </select>

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
