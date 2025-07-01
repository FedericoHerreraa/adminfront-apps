import { useEffect, useState } from "react"
import { LogoutComponent } from "./LogoutComponent"
import { BackButton } from "./BackButton"
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Dish = {
  _id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  ingredientes?: string
  alergenos?: string
}

const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:3000"

const DishesList = () => {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [filtered, setFiltered] = useState<Dish[]>([])
  const [category, setCategory] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const navigate = useNavigate()

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
    setCurrentPage(1)
    if (value === "todas") {
      setFiltered(dishes)
    } else {
      const filteredList = dishes.filter((d) => d.category === value)
      setFiltered(filteredList)
    }
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("¿Estás seguro de que quieres eliminar este plato?")
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
      setFiltered(prev => prev.filter(d => d._id !== id))
      toast.success("Plato eliminado correctamente")
    } catch (err) {
      console.error(err)
      toast.error("Error al eliminar el plato")
    }
  }

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginatedDishes = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 sm:p-6">
      <LogoutComponent />
      <BackButton url="/dishes" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-6 sm:gap-8 mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Platos</h1>
          <p className="text-gray-400 text-base sm:text-lg text-center">Administra los platos del restaurante</p>
        </div>

        <div className="w-full mb-5 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center">
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:max-w-xs bg-gray-800/50 text-white border-gray-700 hover:border-[#B8860B] transition-colors">
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="todas" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Todas las categorías</SelectItem>
              <SelectItem value="entrada" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Entrada</SelectItem>
              <SelectItem value="principal" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Principal</SelectItem>
              <SelectItem value="ensalada" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Ensalada</SelectItem>
              <SelectItem value="postre" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Postre</SelectItem>
              <SelectItem value="bebida" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Bebida</SelectItem>
              <SelectItem value="bebida_alcoholica" className="text-white hover:text-white hover:bg-gray-700/80 focus:bg-gray-700/80">Bebida Alcohólica</SelectItem>
            </SelectContent>
          </Select>

          <button
            onClick={() => navigate("/dishes/create")}
            className="w-full sm:w-auto px-4 py-2 cursor-pointer bg-gradient-to-r from-[#B8860B] to-[#A87408] text-white rounded-lg hover:brightness-110 transition-all"
          >
            Crear Plato
          </button>
        </div>

        <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow className="hover:bg-gray-700/50 border-zinc-600">
                <TableHead className="text-white">Imagen</TableHead>
                <TableHead className="text-white">Nombre</TableHead>
                <TableHead className="text-white">Descripción</TableHead>
                <TableHead className="text-white">Precio</TableHead>
                <TableHead className="text-white">Categoría</TableHead>
                <TableHead className="text-white">Ingredientes</TableHead>
                <TableHead className="text-white">Alérgenos</TableHead>
                <TableHead className="text-right text-white">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDishes.map((dish) => (
                <TableRow key={dish._id} className="hover:bg-gray-700/50 border-zinc-600">
                  <TableCell>
                    {dish.image && (
                      <img
                        src={`${API_URL}/uploads/${dish.image}`}
                        alt={`Imagen de ${dish.name}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-white">{dish.name}</TableCell>
                  <TableCell className="text-gray-400 max-w-[200px] truncate">{dish.description}</TableCell>
                  <TableCell className="text-[#D4AF37] font-bold">${dish.price}</TableCell>
                  <TableCell>
                    <span className="px-3 py-1 text-sm rounded-full bg-[#B8860B]/20 text-[#D4AF37]">
                      {dish.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-400 max-w-[150px] truncate">
                    {dish.ingredientes || "No especificado"}
                  </TableCell>
                  <TableCell className="text-amber-200 max-w-[150px] truncate">
                    {dish.alergenos || "No especificado"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => navigate(`/dishes/edit/${dish._id}`)}
                        className="p-2 text-gray-400 cursor-pointer hover:text-[#D4AF37] transition-colors"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(dish._id)}
                        className="p-2 text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* PAGINACIÓN */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-gray-400 text-sm text-center">
            Mostrando{" "}
            <strong className="text-white">{filtered.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> -{" "}
            <strong className="text-white">{Math.min(currentPage * itemsPerPage, filtered.length)}</strong> de{" "}
            <strong className="text-white">{filtered.length}</strong> platos
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 transition-opacity flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="hidden sm:inline ml-1">Anterior</span>
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 transition-opacity flex items-center justify-center"
            >
              <span className="hidden sm:inline mr-1">Siguiente</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DishesList
