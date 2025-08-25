import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/index';
import NaveBar from './Components/NaveBar/index';
import Footer from './Components/Footer/index';

import BodyHome from './Components/Body';
import BodyProdutos from './Components/Body/BodyProdutos';
import BodyCategoria from './Components/Body/BodyCategoria';
import BodyFornecedor from './Components/Body/BodyFornecedor';

function App() {
  return (
    <Router>
      <Header />
      <NaveBar />

      <Routes>
        <Route path="/Home" element={<BodyHome />} />
        <Route path="/produto" element={<BodyProdutos />} />
        <Route path="/categoria" element={<BodyCategoria />} />
        <Route path="/fornecedor" element={<BodyFornecedor />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
