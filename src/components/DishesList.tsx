import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type Dish = {
  _id: string
  name: string
  description: string
  price: number
  category: string
}

const DishesList = () => {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [filtered, setFiltered] = useState<Dish[]>([])
  const [category, setCategory] = useState<string>("")

  const navigate = useNavigate()

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:3000/api/dishes", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const data = await response.json()
        setDishes(data)
        setFiltered(data)
      } catch (error) {
        console.error("Error al obtener platos:", error)
      }
    }

    fetchDishes()
  }, [])

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value
    setCategory(selected)

    if (selected === "") {
      setFiltered(dishes)
    } else {
      const filteredList = dishes.filter((d) => d.category === selected)
      setFiltered(filteredList)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 relative">
      {/* Botón fijo arriba a la derecha */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleLogout}
          className="py-2 px-4 text-sm font-semibold text-white rounded-md bg-gradient-to-r from-[#B8860B] to-[#A87408] hover:brightness-110 transition-all"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="max-w-screen-md mx-auto w-full mt-12 space-y-6">
        {/* Título */}
        <h2 className="text-3xl font-bold text-center font-serif">
           Platos Disponibles
        </h2>

        {/* Filtro */}
        <div className="w-full max-w-xs mx-auto">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-600"
          >
            <option value="">Todas las categorías</option>
            <option value="entrada">Entrada</option>
            <option value="principal">Principal</option>
            <option value="postre">Postre</option>
            <option value="bebida">Bebida</option>
          </select>
        </div>

        {/* Lista de platos */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filtered.map((dish) => (
            <li
              key={dish._id}
              className="bg-gray-800 text-white p-4 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold">{dish.name}</h3>
              <p className="text-sm text-gray-300">{dish.description}</p>
              <p className="text-sm mt-1"> ${dish.price}</p>
              <p className="text-sm text-gray-400 mt-1">
                <span className="font-medium text-white">Categoría:</span>{" "}
                {dish.category}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default DishesList
