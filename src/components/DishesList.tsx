import { useEffect, useState } from "react"
import { LogoutComponent } from "./LogoutComponent"
import { BackButton } from "./BackButton"

type Dish = {
  _id: string
  name: string
  description: string
  price: number
  category: string
}

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000"

const DishesList = () => {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [filtered, setFiltered] = useState<Dish[]>([])
  const [category, setCategory] = useState("")

  useEffect(() => {
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
        setFiltered(data)
      } catch (error) {
        console.error("Error al obtener platos:", error)
      }
    }

    fetchDishes()
  }, [])

  const handleCategoryChange = (value: string) => {
    setCategory(value)

    if (value === "") {
      setFiltered(dishes)
    } else {
      const filteredList = dishes.filter((d) => d.category === value)
      setFiltered(filteredList)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-4 py-6 relative">
      <LogoutComponent />
      <BackButton url="/dishes"/>

      <div className="max-w-screen-md mx-auto w-full mt-12 space-y-6">
        <h2 className="text-3xl font-bold text-center font-serif">
           Platos Disponibles
        </h2>

        <div className="w-full max-w-xs mx-auto">
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full bg-gray-800/50 text-white border-gray-700 hover:border-[#B8860B] transition-colors">
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="entrada" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Entrada</SelectItem>
              <SelectItem value="principal" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Principal</SelectItem>
              <SelectItem value="postre" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Postre</SelectItem>
              <SelectItem value="bebida" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Bebida</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
