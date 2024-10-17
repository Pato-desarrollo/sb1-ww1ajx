import React, { useEffect, useState } from 'react';
import { getUserProfile, addVehicle } from '../services/api';
import { User, Plus } from 'lucide-react';

interface UserProfile {
  username: string;
  email: string;
}

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [newVehicle, setNewVehicle] = useState({ make: '', model: '', year: 0, price: 0 });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile();
        setProfile(profileData.user);
        setVehicles(profileData.vehicles);
      } catch (error) {
        console.error('Error al obtener el perfil:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedVehicle = await addVehicle(newVehicle);
      setVehicles([...vehicles, addedVehicle]);
      setShowAddVehicle(false);
      setNewVehicle({ make: '', model: '', year: 0, price: 0 });
    } catch (error) {
      console.error('Error al agregar vehículo:', error);
    }
  };

  if (!profile) {
    return <div className="container mx-auto px-4 py-8">Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
        <div className="flex items-center mb-4">
          <User size={48} className="text-blue-500 mr-4" />
          <div>
            <h2 className="text-3xl font-bold">{profile.username}</h2>
            <p className="text-gray-400">{profile.email}</p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Mis Vehículos</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h4 className="text-xl font-semibold mb-2">{vehicle.make} {vehicle.model}</h4>
            <p className="text-gray-400">Año: {vehicle.year}</p>
          </div>
        ))}
      </div>

      {!showAddVehicle && (
        <button
          onClick={() => setShowAddVehicle(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <Plus className="mr-2" />
          Agregar Vehículo
        </button>
      )}

      {showAddVehicle && (
        <form onSubmit={handleAddVehicle} className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h4 className="text-xl font-bold mb-4">Agregar Nuevo Vehículo</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Marca"
              value={newVehicle.make}
              onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
              className="p-2 rounded text-black"
              required
            />
            <input
              type="text"
              placeholder="Modelo"
              value={newVehicle.model}
              onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
              className="p-2 rounded text-black"
              required
            />
            <input
              type="number"
              placeholder="Año"
              value={newVehicle.year || ''}
              onChange={(e) => setNewVehicle({ ...newVehicle, year: parseInt(e.target.value) })}
              className="p-2 rounded text-black"
              required
            />
            <input
              type="number"
              placeholder="Precio"
              value={newVehicle.price || ''}
              onChange={(e) => setNewVehicle({ ...newVehicle, price: parseInt(e.target.value) })}
              className="p-2 rounded text-black"
              required
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setShowAddVehicle(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar Vehículo
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;