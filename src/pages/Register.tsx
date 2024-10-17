import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { registerUser } from '../services/api';

interface RegisterProps {
  login: () => void;
}

const Register: React.FC<RegisterProps> = ({ login }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await registerUser(username, email, password);
      login(); // Actualiza el estado de autenticación
      navigate('/profile');
    } catch (error) {
      setError('Error al registrar usuario. Por favor, inténtelo de nuevo.');
    }
  };

  // ... resto del componente sin cambios
};

export default Register;