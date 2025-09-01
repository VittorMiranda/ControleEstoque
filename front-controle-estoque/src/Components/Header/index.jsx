import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo-Photoroom.png';
import { useState, useEffect } from 'react';
import { getToken, logout } from '../../Services/auth';
import Button from '../Button'

const Header = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario && usuario.nome) setUserName(usuario.nome);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUserName(null);
    navigate('/signin');
  };

  return (
    <header className='header'>
      <img src={logo} alt="Logo" />
        <div className="auth-links" key={userName}>
          {userName ? (
            <>
              <span>Olá, {userName}!</span>
              <Button onClick={handleLogout} text={"Sair"}/>
            </>
          ) : (
            <>
              <Link to="/signin">Sign-in</Link>
              <Link to="/signup">Sign-up</Link>
            </>
          )}
        </div>
 
    </header>
  );
};

export default Header;
