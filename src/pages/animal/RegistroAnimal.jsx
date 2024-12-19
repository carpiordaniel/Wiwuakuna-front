import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Box, Button, Modal, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Swal from 'sweetalert2';
import axiosClient from '../../axios/apiClient';
import { FINCAS, INSTALACIONES, COLORS } from '@/globals/constantes';

export const RegistroAnimal = () => {
  const [open, setOpen] = useState(false);
  const [animales, setAnimales] = useState([]);
  const [fincas, setFincas] = useState([]);
  const [instalaciones, setInstalaciones] = useState([]);
  const [lotes, setLotes] = useState([]);
  const [fincaSeleccionada, setFincaSeleccionada] = useState('');
  const [instalacionSeleccionada, setInstalacionSeleccionada] = useState('');
  const [loteSeleccionado, setLoteSeleccionado] = useState('');
  const [usuario, setUsuario] = useState(localStorage.getItem('USUARIO') || '');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'tipo', headerName: 'Tipo', flex: 1 },
    { field: 'codigo', headerName: 'Código', flex: 1 },
    { field: 'sexo', headerName: 'Sexo', flex: 1 },
    { field: 'lote', headerName: 'Lote', flex: 1 },
    { field: 'estado', headerName: 'Estado', flex: 1 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'grupo', headerName: 'Grupo', flex: 1 },
  ];

  useEffect(() => {
    cargarFincas();
  }, [usuario]);

  useEffect(() => {
    if (fincaSeleccionada) {
      cargarInstalaciones();
      cargarLotes();
      cargarAnimales();
    }
  }, [fincaSeleccionada, instalacionSeleccionada, loteSeleccionado]);

  const cargarFincas = async () => {
    try {
      const response = await axiosClient.get(FINCAS.GET_BY_RESPONSABLE(usuario));
      setFincas(response.data);
    } catch (error) {
      console.error('Error al cargar fincas:', error);
    }
  };

  const cargarInstalaciones = async () => {
    try {
      const response = await axiosClient.get(INSTALACIONES.GET_BY_FILTER(usuario, fincaSeleccionada));
      setInstalaciones(response.data);
    } catch (error) {
      console.error('Error al cargar instalaciones:', error);
    }
  };

  const cargarLotes = async () => {
    try {
      const response = await axiosClient.get(`/api/lotes/finca/${fincaSeleccionada}`);
      setLotes(response.data);
    } catch (error) {
      console.error('Error al cargar lotes:', error);
    }
  };

  const cargarAnimales = async () => {
    try {
      const params = { finca: fincaSeleccionada };
      if (instalacionSeleccionada) params.instalacion = instalacionSeleccionada;
      if (loteSeleccionado) params.lote = loteSeleccionado;

      const response = await axiosClient.get('/api/filter-animales', { params });
      setAnimales(response.data);
    } catch (error) {
      console.error('Error al cargar animales:', error);
    }
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ margin: '10px' }}>
        Administración de Animales
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, margin: '10px' }}>
        <FormControl fullWidth>
          <InputLabel id="finca-select-label">Finca</InputLabel>
          <Select
            labelId="finca-select-label"
            value={fincaSeleccionada}
            onChange={(e) => setFincaSeleccionada(e.target.value)}
          >
            {fincas.map((finca) => (
              <MenuItem key={finca.id} value={finca.id}>
                {finca.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="instalacion-select-label">Instalación</InputLabel>
          <Select
            labelId="instalacion-select-label"
            value={instalacionSeleccionada}
            onChange={(e) => setInstalacionSeleccionada(e.target.value)}
          >
            {instalaciones.map((instalacion) => (
              <MenuItem key={instalacion.id} value={instalacion.id}>
                {instalacion.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="lote-select-label">Lote</InputLabel>
          <Select
            labelId="lote-select-label"
            value={loteSeleccionado}
            onChange={(e) => setLoteSeleccionado(e.target.value)}
          >
            {lotes.map((lote) => (
              <MenuItem key={lote.id} value={lote.id}>
                {lote.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button
        variant="contained"
        sx={{
          margin: '10px',
          cursor: 'pointer',
          borderRadius: '10px',
          color: 'white',
          backgroundColor: COLORS.PRIMARY,
        }}
        onClick={handleOpen}
      >
        Agregar Animal
      </Button>

      <DataGrid
        rows={animales}
        columns={columns}
        initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};
