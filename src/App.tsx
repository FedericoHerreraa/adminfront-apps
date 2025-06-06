import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardComponent from "./components/DashboardComponent"
import DishPanel from "./components/DishPanel"
import UserPanel from "./components/UserPanel"
import ProtectedRoute from "./components/ProtectedRoute" 
import DishesList from "./components/DishesList"
import DeleteDish from "./components/DeleteDish"
import CreateDish from "./components/CreateDish"
import HomeRedirect from "./pages/HomeRedirect"
import { Toaster } from "sonner"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dishes"
            element={
              <ProtectedRoute>
                <DishPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dishes/list"
            element={
              <ProtectedRoute>
                <DishesList />
              </ProtectedRoute>
            }
          />
          <Route path="/dishes/delete" element={
            <ProtectedRoute>
              <DeleteDish />
            </ProtectedRoute>
          } />
          <Route path="/dishes/create" element={
            <ProtectedRoute>
              <CreateDish />
            </ProtectedRoute>
          } />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UserPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
