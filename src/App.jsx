import { Routes, Route, Navigate } from "react-router-dom";
import PaginaLogin from "./pages/Login/PaginaLogin";
import HomePage from "./pages/Home/HomePage";
import PaginaAdmin from "./pages/Admin/PaginaAdm";
import Registro from "./pages/Registro/PaginaRegistro";
import Cadastro from "./pages/Cadastro/PaginaCadastro";
import ProtectedRoute from "./components/ProtectedRoute";
import MinhasOcorrencias from "./pages/MinhasOcorrencias/MinhasOcorrencias";
import PaginaCadastro from "./pages/Cadastro/PaginaCadastro";
import PerfilUsuario from "./pages/PerfilUsuario/PerfilUsuario";
//import './styles/style.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaLogin />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <PaginaAdmin />
          </ProtectedRoute>
        }
              />
      <Route
        path="/Pagina-Login"
        element={
          <ProtectedRoute>
            <PaginaLogin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/registro"
        element={
          <ProtectedRoute>
            <Registro />
          </ProtectedRoute>
        }
      />
      <Route
        path="/perfil-usuario"
        element={
          <ProtectedRoute>
            <PerfilUsuario />
          </ProtectedRoute>
        }
      />
        <Route
        path="/minhas-ocorrencias"
        element={
          <ProtectedRoute>
            <MinhasOcorrencias />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cadastro"
        element={
          <ProtectedRoute>
            <PaginaCadastro />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
