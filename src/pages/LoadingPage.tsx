import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { Loader2 } from "lucide-react"

export default function LoadingPage() {
    const navigate = useNavigate()
    const { user } = useAuth()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (user) {
                navigate("/dashboard")
            } else {
                navigate("/login")
            }
        }, 2000)
        return () => clearTimeout(timer)
    }, [navigate, user])

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-b from-gray-900 to-black">
            <Loader2 className="w-10 h-10 animate-spin text-white" />
        </div>
    )
}