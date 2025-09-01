import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo-Photoroom.png';
import { useAuth } from '../../Contexts/AuthContext';
import Button from '../Button';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const handleLogoClick = () => {
    navigate('/home');
  };

  return (
    <header className='header'>
      {/* Logo clicável */}
      <img 
        src={logo} 
        alt="Logo" 
        style={{ cursor: 'pointer' }}
        onClick={handleLogoClick}
      />

      <div className="auth-links">
        {user ? (
          <>
            <span>Olá, {user.nome}!</span>
            <Button onClick={handleLogout} text="Sair" />
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
