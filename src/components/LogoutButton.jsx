import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('token');
    navigate('/auth/login'); // Redirige al login
    
  }, [navigate]);
}

export default LogoutButton
