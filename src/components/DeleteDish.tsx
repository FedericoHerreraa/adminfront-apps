import { useEffect, useState } from "react"
import { toast } from "sonner"

type Dish = {
  _id: string
  name: string
  category: string
  image?: string
  ingredientes?: string
  alergenos?: string
}

const API_URL = import.meta.env.VITE_REACT_APP_API_URL 

const DeleteDish = () => {
  const [dishes, setDishes] = useState<Dish[]>([])

  const fetchDishes = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/api/dishes`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await response.json()
      setDishes(data)
    } catch (err) {
      console.error("Error al cargar platos:", err)
    }
  }

  useEffect(() => {
    fetchDishes()
  }, [])

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("¿Estás segura/o de que querés eliminar este plato?")
    if (!confirmDelete) return

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/api/dishes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error("Error al eliminar el plato")
      }

      setDishes(prev => prev.filter(d => d._id !== id))
      toast.success("Plato eliminado correctamente")
    } catch (err) {
      console.error(err)
      toast.error("Error al eliminar el plato")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 py-6">
      <div className="max-w-screen-md mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center font-serif">
          Eliminar Platos
        </h2>

        <ul className="space-y-4">
          {dishes.map((dish) => (
            <li
              key={dish._id}
              className="bg-gray-800 p-4 rounded-md shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="flex items-start gap-4 w-full">
                {dish.image && (
                  <img
                    src={`${API_URL}/uploads/${dish.image}`}
                    alt={dish.name}
                    className="w-24 h-24 object-cover rounded border"
                  />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-lg">{dish.name}</p>
                  <p className="text-sm text-gray-400">Categoría: {dish.category}</p>
                  {dish.ingredientes && (
                    <p className="text-sm text-gray-300">🧂 Ingredientes: {dish.ingredientes}</p>
                  )}
                  {dish.alergenos && (
                    <p className="text-sm text-red-300">⚠️ Alérgenos: {dish.alergenos}</p>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleDelete(dish._id)}
                className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-md text-sm self-end sm:self-auto"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DeleteDish
