import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Box, Button, Modal, Typography, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import Swal from 'sweetalert2';
import axiosClient from '../../axios/apiClient';
import { FINCAS, COLORS } from '../../globals/constantes';
import { CrearLote } from './CrearLote';

export const RegistroLote = () => {
  const [open, setOpen] = useState(false);
  const [lotes, setLotes] = useState([]);
  const [fincas, setFincas] = useState([]);
  const [fincaSeleccionada, setFincaSeleccionada] = useState('');
  const [accion, setAccion] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'tipoGanado', headerName: 'Tipo Ganado', flex: 1 },
    { field: 'cantidadAnimales', headerName: 'Cantidad de Animales', flex: 1 },
    {
      field: 'action',
      headerName: 'Acción',
      flex: 1,
      renderCell: (params) => (
        <>
          <Button color="primary" onClick={() => handleOpenModal('editar', params.row)}>
            Editar
          </Button>
          <Button color="error" onClick={() => handleEliminar(params.row.id)}>
            Eliminar
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    cargarFincas();
  }, []);

  useEffect(() => {
    if (fincaSeleccionada) {
      cargarLotes();
    }
  }, [fincaSeleccionada]);

  const cargarFincas = async () => {
    try {
      const response = await axiosClient.get(FINCAS.GET_ALL);
      setFincas(response.data);
    } catch (error) {
      console.error('Error al cargar fincas:', error);
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

  const handleEliminar = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosClient.delete(`/api/lotes/${id}`).then(() => {
          Swal.fire('Eliminado!', 'El registro ha sido eliminado.', 'success');
          cargarLotes();
        });
      }
    });
  };

  const handleOpenModal = (dato) => {
    setAccion(dato);
    handleOpen();
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ margin: '10px' }}>
        Administración de Lotes
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
        onClick={() => handleOpenModal('crear')}
      >
        Agregar Lote
      </Button>

      <Box sx={{ margin: '10px', width: '100%' }}>
        <Modal open={open} onClose={handleClose}>
          <Box sx={{ padding: 4 }}>
            <CrearLote accion={accion} />
          </Box>
        </Modal>
      </Box>

      <DataGrid
        rows={lotes}
        columns={columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};
