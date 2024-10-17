import axios from 'axios';

const USERS_WEBHOOK = 'https://discord.com/api/webhooks/1296194953688387604/73AL3nqM0oV_-7s_e7kjqGkgNKbHGSilhq7SpRE_9-YUOnGfwkMY6g2sxUP326mIRl5W';
const CARS_WEBHOOK = 'https://discord.com/api/webhooks/1296195221515796583/C__Euwsbpyfomw49y-1dN3Xh5rGGa6ZGkRHyeqKDPgGPJosHNs3k7qt2KlFhRTGjOAGF';
const TRANSACTIONS_WEBHOOK = 'https://discord.com/api/webhooks/1296195358933778524/gLgKq1p5voViyreJBHsLlK9K9Qm59NAkEhWF5_s0Ej12fl9z6i7NRjU8C55M49RgQKQA';

const sendToDiscord = async (webhook: string, data: any, title: string, color: number) => {
  try {
    const embed = {
      title: title,
      color: color,
      fields: Object.entries(data).map(([key, value]) => ({
        name: key,
        value: String(value),
        inline: true
      })),
      timestamp: new Date().toISOString()
    };

    await axios.post(webhook, { embeds: [embed] });
  } catch (error) {
    console.error('Error sending data to Discord:', error);
    throw error;
  }
};

let users: any[] = [];
let cars: any[] = [];

export const registerUser = async (username: string, email: string, password: string) => {
  const userData = { username, email, password, created_at: new Date().toISOString() };
  users.push(userData);
  await sendToDiscord(USERS_WEBHOOK, userData, 'Nuevo Usuario Registrado', 0x00ff00);
  return userData;
};

export const loginUser = async (email: string, password: string) => {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const loginData = { email, logged_in_at: new Date().toISOString() };
    await sendToDiscord(USERS_WEBHOOK, loginData, 'Usuario Conectado', 0x0000ff);
    return user;
  }
  throw new Error('Correo electrónico o contraseña incorrectos');
};

export const getUserProfile = async () => {
  // Simular obtención de perfil (en una aplicación real, esto se obtendría del backend)
  return {
    user: { username: 'Usuario Ejemplo', email: 'usuario@ejemplo.com' },
    vehicles: cars.filter(car => car.seller_id === 'user123') // Filtrar coches del usuario actual
  };
};

export const addVehicle = async (vehicleData: any) => {
  const newVehicle = { 
    ...vehicleData, 
    id: Date.now(), 
    created_at: new Date().toISOString(),
    seller_id: 'user123', // En una aplicación real, esto sería el ID del usuario autenticado
    location: 'Ciudad Ejemplo' // Añadir una ubicación por defecto
  };
  cars.push(newVehicle);
  await sendToDiscord(CARS_WEBHOOK, newVehicle, 'Nuevo Vehículo Agregado', 0xff9900);
  return newVehicle;
};

export const getCars = async () => {
  return cars;
};

export const getCarDetails = async (id: number) => {
  const car = cars.find(c => c.id === id);
  if (!car) {
    throw new Error('Vehículo no encontrado');
  }
  return car;
};

export const buyVehicle = async (carId: number) => {
  const car = cars.find(c => c.id === carId);
  if (!car) {
    throw new Error('Vehículo no encontrado');
  }
  const transaction = {
    transaction_id: Date.now(),
    car_id: carId,
    buyer_id: 'user123', // En una aplicación real, esto sería el ID del usuario autenticado
    seller_id: car.seller_id,
    amount: car.price,
    transaction_date: new Date().toISOString()
  };
  await sendToDiscord(TRANSACTIONS_WEBHOOK, transaction, 'Nueva Transacción', 0xff0000);
  return transaction;
};