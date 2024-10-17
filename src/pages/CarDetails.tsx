import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarDetails, buyVehicle } from '../services/api';
import { Car as CarIcon, DollarSign, Info } from 'lucide-react';

interface CarDetails {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  color: string;
  mileage: number;
  condition: string;
  description: string;
}

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<CarDetails | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (id) {
        try {
          const carData = await getCarDetails(parseInt(id));
          setCar(carData);
        } catch (error) {
          console.error('Error al obtener los detalles del auto:', error);
        }
      }
    };
    fetchCarDetails();
  }, [id]);

  const handleBuy = async () => {
    if (car) {
      try {
        await buyVehicle(car.id);
        alert('¡Compra realizada con éxito!');
        navigate('/profile');
      } catch (error) {
        console.error('Error al realizar la compra:', error);
        alert('Hubo un error al procesar la compra. Por favor, inténtelo de nuevo.');
      }
    }
  };

  if (!car) {
    return <div className="container mx-auto px-4 py-8">Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6">
        <div className="flex items-center justify-center mb-6">
          <CarIcon size={64} className="text-blue-500" />
        </div>
        <h2 className="text-3xl font-bold mb-4">{car.make} {car.model}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xl mb-2"><span className="font-semibold">Año:</span> {car.year}</p>
            <p className="text-xl mb-2"><span className="font-semibold">Color:</span> {car.color}</p>
            <p className="text-xl mb-2"><span className="font-semibold">Kilometraje:</span> {car.mileage} km</p>
            <p className="text-xl mb-2"><span className="font-semibold">Condición:</span> {car.condition}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-500 mb-4"><DollarSign className="inline mr-1" />{car.price.toLocaleString()}</p>
            <button
              onClick={handleBuy}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4"
            >
              Comprar Ahora
            </button>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 flex items-center"><Info className="mr-2" />Descripción</h3>
              <p>{car.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;