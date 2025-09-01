import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedLayout from './layouts/ProtectedLayout';
import { getToken } from './Services/auth';
import { AuthProvider } from './Contexts/AuthContext';

import BodyHome from './Components/Body';
import BodyProdutos from './Components/Body/BodyProdutos';
import BodyCategoria from './Components/Body/BodyCategoria';
import BodyFornecedor from './Components/Body/BodyFornecedor';
import BodySignIn from './Components/Body/BodySignIn';
import BodySignUp from './Components/Body/BodySignUp';
import Header from './Components/Header';

const PublicRoute = ({ children }) => {
  const token = getToken();
  return !token ? children : <Navigate to="/home" />;
};

const PrivateRoute = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to="/signup" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />

          {/* Rotas públicas */}
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <BodySignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <BodySignIn />
              </PublicRoute>
            }
          />

          {/* Rotas protegidas */}
          <Route
            element={
              <PrivateRoute>
                <ProtectedLayout />
              </PrivateRoute>
            }
          >
            <Route path="/home" element={<BodyHome />} />
            <Route path="/produto/editar/:id" element={<BodyProdutos />} />
            <Route path="/produto" element={<BodyProdutos />} />
            <Route path="/categoria" element={<BodyCategoria />} />
            <Route path="/fornecedor" element={<BodyFornecedor />} />
          </Route>

          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
