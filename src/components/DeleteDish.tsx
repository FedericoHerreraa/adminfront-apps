import { useEffect, useState } from "react"

type Dish = {
  _id: string
  name: string
  category: string
}

const DeleteDish = () => {
  const [dishes, setDishes] = useState<Dish[]>([])

  const fetchDishes = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/dishes", {
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
      const response = await fetch(`/api/dishes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error("Error al eliminar el plato")
      }

      // Actualizar lista local
      setDishes(prev => prev.filter(d => d._id !== id))
      alert("Plato eliminado correctamente ✅")
    } catch (err) {
      console.error(err)
      alert("Error al eliminar el plato ❌")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      <div className="max-w-screen-md mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center font-serif">
          🗑️ Eliminar Platos
        </h2>

        <ul className="space-y-4">
          {dishes.map((dish) => (
            <li
              key={dish._id}
              className="flex items-center justify-between bg-gray-800 p-4 rounded-md"
            >
              <div>
                <p className="font-semibold text-lg">{dish.name}</p>
                <p className="text-sm text-gray-400">Categoría: {dish.category}</p>
              </div>

              <button
                onClick={() => handleDelete(dish._id)}
                className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-sm"
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
