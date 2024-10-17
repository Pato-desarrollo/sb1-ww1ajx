import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import { loginUser } from '../services/api';

interface LoginProps {
  login: () => void;
}

const Login: React.FC<LoginProps> = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await loginUser(email, password);
      login(); // Actualiza el estado de autenticación
      navigate('/profile');
    } catch (error) {
      setError('Correo electrónico o contraseña incorrectos');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-black"
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-105 mb-4"
        >
          <LogIn className="mr-2" />
          Iniciar Sesión
        </button>
      </form>
      <div className="text-center mt-4">
        <Link to="/register" className="text-blue-400 hover:text-blue-300 flex items-center justify-center">
          <UserPlus className="mr-2" />
          ¿No tienes una cuenta? Regístrate aquí
        </Link>
      </div>
    </div>
  );
};

export default Login;