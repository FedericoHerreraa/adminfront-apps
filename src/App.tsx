import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import DashboardComponent from "./components/DashboardComponent"
import DishPanel from "./components/DishPanel"
import UserPanel from "./components/UserPanel"
import ProtectedRoute from "./components/ProtectedRoute" 
import DishesList from "./components/DishesList"
import CreateDish from "./components/CreateDish"
import HomeRedirect from "./pages/HomeRedirect"
import EditDish from "./components/EditDish"
import { Toaster } from "sonner"
import { AuthProvider } from "./context/AuthContext"
import UserList from "./components/UserList"
import CreateUser from "./components/CreateUser"
import UpdateUser from "./components/UpdateUser"
import AuditLog from "./components/AuditLog";
import LoadingPage from "./pages/LoadingPage"


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster />
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/loading" element={<LoadingPage />} />
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
          <Route path="/dishes/edit/:id" element={
            <ProtectedRoute>
              <EditDish />
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
          <Route
            path="/users/list"
            element={
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/create"
            element={
              <ProtectedRoute>
                <CreateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/edit/:id"
            element={
              <ProtectedRoute>
                <UpdateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/auditoria"
            element={
              <ProtectedRoute>
                <AuditLog />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
