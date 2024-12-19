import React, { useState, useEffect } from 'react';
import { TextField, MenuItem } from '@mui/material';
import axiosClient from '../../axios/apiClient';
import { DICCIONARIOS } from '@/globals/constantes';
//sjdsabdjas
const Catalogos = ({ tabla, label, value, onChange }) => {
  const [catalogoData, setCatalogoData] = useState([]);

  useEffect(() => {
    if (tabla) {
      getCatalogoData(tabla);
    }
  }, [tabla]);

  const getCatalogoData = async (tabla) => {
    try {
      const response = await axiosClient.get(DICCIONARIOS.GET_BY_TABLA(tabla));
      setCatalogoData(response.data);
    } catch (error) {
      console.error('Error al obtener datos del catálogo:', error);
    }
  };

  return (
    <TextField
      select
      fullWidth
      label={label}
      value={value}
      onChange={onChange}
      variant="outlined"
      margin="normal"
    >
      {catalogoData.map((item) => (
        <MenuItem key={item.id} value={item.codigo}>
          {item.nombre}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default Catalogos;
