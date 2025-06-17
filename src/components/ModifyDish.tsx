import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type Dish = {
  _id: string
  name: string
  category: string
  price: number
}

const API_URL = import.meta.env.VITE_REACT_APP_API_URL 

const ModifyDish = () => {
  const [dishes, setDishes] = useState<Dish[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`${API_URL}/api/dishes`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json()
        setDishes(data)
      } catch (error) {
        console.error("Error al obtener platos:", error)
      }
    }

    fetchDishes()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      <div className="max-w-screen-md mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center font-serif">Modificar Platos</h2>

        <ul className="space-y-4">
          {dishes.map((dish) => (
            <li
              key={dish._id}
              className="flex items-center justify-between bg-gray-800 p-4 rounded-md"
            >
              <div>
                <p className="font-semibold text-lg">{dish.name}</p>
                <p className="text-sm text-gray-400">Categoría: {dish.category}</p>
                <p className="text-sm text-gray-400">Precio: ${dish.price}</p>
              </div>
              <button
                onClick={() => navigate(`/dishes/edit/${dish._id}`)}
                className="bg-yellow-700 hover:bg-yellow-800 text-white py-1 px-3 rounded-md text-sm"
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ModifyDish
