import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "sonner"

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000"

type Dish = {
  name: string
  description: string
  price: number
  category: string
}

const EditDish = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [dish, setDish] = useState<Dish>({
    name: "",
    description: "",
    price: 0,
    category: ""
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    fetch(`${API_URL}/api/dishes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then((data: Dish) => {
        setDish(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error al obtener el plato", err)
        toast.error("Error al obtener el plato")
      })
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setDish(prev => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/api/dishes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(dish)
      })

      if (!response.ok) throw new Error("Error al actualizar el plato")

      toast.success("Plato actualizado con éxito")
      navigate("/dishes/edit")
    } catch (err) {
      console.error("Error al actualizar el plato", err)
      toast.error("No se pudo actualizar el plato")
    }
  }

  if (loading) return <div className="text-white">Cargando...</div>

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl text-black w-full max-w-md shadow-md space-y-4">
        <h2 className="text-xl font-bold text-center">Editar Plato</h2>

        <input
          name="name"
          value={dish.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Nombre"
          required
        />
        <input
          name="description"
          value={dish.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Descripción"
          required
        />
        <input
          name="price"
          type="number"
          value={dish.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Precio"
          required
        />
        <select
          name="category"
          value={dish.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
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
          className="w-full bg-yellow-700 text-white py-2 rounded hover:brightness-110 transition-all"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  )
}

export default EditDish
