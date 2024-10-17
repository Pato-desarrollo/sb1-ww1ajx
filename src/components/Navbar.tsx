import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, User, LogIn, LogOut } from 'lucide-react';

interface NavbarProps {
  isAuthenticated: boolean;
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <Car className="mr-2" />
          AutoFuture
        </Link>
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/cars" className="flex items-center hover:text-blue-400">
                <Car className="mr-1" size={18} />
                Autos
              </Link>
              <Link to="/profile" className="flex items-center hover:text-blue-400">
                <User className="mr-1" size={18} />
                Perfil
              </Link>
              <button onClick={handleLogout} className="flex items-center hover:text-blue-400">
                <LogOut className="mr-1" size={18} />
                Salir
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center hover:text-blue-400">
              <LogIn className="mr-1" size={18} />
              Ingresar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;