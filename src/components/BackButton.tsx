import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"

export const BackButton = ({ url }: { url: string }) => {
    const navigate = useNavigate()

    return (
        <div className="absolute top-4 left-4 z-10">
            <button
                onClick={() => navigate(url)}
                className="flex items-center gap-2 py-2 px-4 text-sm cursor-pointer font-semibold text-zinc-300 rounded-md bg-zinc-200/20 hover:brightness-110 transition-all"
            >
                <FaArrowLeft />
                Volver
            </button>
        </div>
    )
}