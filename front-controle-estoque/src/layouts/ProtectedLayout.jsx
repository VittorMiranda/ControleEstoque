// layouts/ProtectedLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import NaveBar from '../Components/NaveBar';
import Footer from '../Components/Footer';

const ProtectedLayout = () => {
  return (
    <div className="app-layout">
      <NaveBar />
      <main>
        <Outlet /> {/* Aqui vai o conteúdo das rotas protegidas */}
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
