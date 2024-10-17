import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCars } from '../services/api';
import { Car as CarIcon, Search } from 'lucide-react';

interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
}

const CarListing: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    minYear: '',
    maxYear: '',
    minPrice: '',
    maxPrice: '',
    minMileage: '',
    maxMileage: '',
    location: ''
  });

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await getCars();
        setCars(carsData);
        setFilteredCars(carsData);
      } catch (error) {
        console.error('Error al obtener los autos:', error);
      }
    };
    fetchCars();
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let result = cars;

    if (filters.make) {
      result = result.filter(car => car.make.toLowerCase().includes(filters.make.toLowerCase()));
    }
    if (filters.model) {
      result = result.filter(car => car.model.toLowerCase().includes(filters.model.toLowerCase()));
    }
    if (filters.minYear) {
      result = result.filter(car => car.year >= parseInt(filters.minYear));
    }
    if (filters.maxYear) {
      result = result.filter(car => car.year <= parseInt(filters.maxYear));
    }
    if (filters.minPrice) {
      result = result.filter(car => car.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(car => car.price <= parseInt(filters.maxPrice));
    }
    if (filters.minMileage) {
      result = result.filter(car => car.mileage >= parseInt(filters.minMileage));
    }
    if (filters.maxMileage) {
      result = result.filter(car => car.mileage <= parseInt(filters.maxMileage));
    }
    if (filters.location) {
      result = result.filter(car => car.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    setFilteredCars(result);
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      <h2 className="text-3xl font-bold mb-6">Vehículos Disponibles</h2>
      
      <div className="mb-8 bg-gray-800 p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Filtros</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="make"
            placeholder="Marca"
            value={filters.make}
            onChange={handleFilterChange}
            className="p-2 rounded text-black"
          />
          <input
            type="text"
            name="model"
            placeholder="Modelo"
            value={filters.model}
            onChange={handleFilterChange}
            className="p-2 rounded text-black"
          />
          <input
            type="number"
            name="minYear"
            placeholder="Año mínimo"
            value={filters.minYear}
            onChange={handleFilterChange}
            className="p-2 rounded text-black"
          />
          <input
            type="number"
            name="maxYear"
            placeholder="Año máximo"
            value={filters.maxYear}
            onChange={handleFilterChange}
            className="p-2 rounded text-black"
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Precio mínimo"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="p-2 rounded text-black"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Precio máximo"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="p-2 rounded text-black"
          />
          <input
            type="number"
            name="minMileage"
            placeholder="Kilometraje mínimo"
            value={filters.minMileage}
            onChange={handleFilterChange}
            className="p-2 rounded text-black"
          />
          <input
            type="number"
            name="maxMileage"
            placeholder="Kilometraje máximo"
            value={filters.maxMileage}
            onChange={handleFilterChange}
            className="p-2 rounded text-black"
          />
          <input
            type="text"
            name="location"
            placeholder="Ubicación"
            value={filters.location}
            onChange={handleFilterChange}
            className="p-2 rounded text-black"
          />
        </div>
        <button
          onClick={applyFilters}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300 ease-in-out transform hover:scale-105"
        >
          <Search className="mr-2" />
          Aplicar Filtros
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <Link key={car.id} to={`/cars/${car.id}`} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center mb-4">
              <CarIcon size={48} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{car.make} {car.model}</h3>
            <p className="text-gray-400">Año: {car.year}</p>
            <p className="text-gray-400">Kilometraje: {car.mileage} km</p>
            <p className="text-gray-400">Ubicación: {car.location}</p>
            <p className="text-green-500 font-bold mt-2">${car.price.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CarListing;