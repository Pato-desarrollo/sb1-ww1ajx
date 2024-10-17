import React from 'react';
import { Link } from 'react-router-dom';
import { Car, UserPlus } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-4xl font-bold mb-6 text-center">Bienvenido a AutoFuture</h1>
      <p className="text-xl mb-8 text-center">
        La plataforma futurista para comprar y vender vehículos de todo tipo.
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          to="/register"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300 ease-in-out transform hover:scale-105"
        >
          <UserPlus className="mr-2" />
          Registrarse
        </Link>
        <Link
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300 ease-in-out transform hover:scale-105"
        >
          <Car className="mr-2" />
          Ver Vehículos
        </Link>
      </div>
    </div>
  );
};

export default Home;