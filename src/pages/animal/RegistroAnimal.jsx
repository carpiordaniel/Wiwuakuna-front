import React, { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Box, Button, Modal, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Swal from 'sweetalert2';
import axiosClient from '../../axios/apiClient';
import { FINCAS, INSTALACIONES, COLORS, ANIMALES } from '@/globals/constantes';
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import { CrearRegistroAnimal } from './CrearRegistroAnimal';

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

  const [accion, setAccion] = useState("");
  const dataRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'tipo', headerName: 'Tipo', flex: 1 },
    { field: 'sexo', headerName: 'Sexo', flex: 1 },
    { field: 'lote', headerName: 'Lote', flex: 1 },
    { field: 'estado', headerName: 'Estado', flex: 1 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'grupo', headerName: 'Grupo', flex: 1 },
    { field: 'finca', headerName: 'Finca', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <>
          <EditIcon color='primary' sx={{ cursor: 'pointer', margin: '5px' }} onClick={() => handleOpenModal("editar", params.row)} />
          <Delete color='error' sx={{ cursor: 'pointer', margin: '5px' }} onClick={() => handleEliminar(params.row.id)} />
        </>


      ),
    }
  ];

  useEffect(() => {
    // cargarFincas();
  }, [usuario]);

  useEffect(() => {
    // if (fincaSeleccionada) {
    cargarInstalaciones();
    cargarLotes();
    cargarAnimales();
    // }
  }, [fincaSeleccionada, instalacionSeleccionada, loteSeleccionado]);

  const cargarFincas = async () => {
    try {
      const response = await axiosClient.get(`${FINCAS.GET_FINCA}?responsable=${usuario}`);
      setFincas(response.data);
    } catch (error) {
      console.error('Error al cargar fincas:', error);
    }
  }

  const cargarInstalaciones = async () => {
    try {
      const response = await axiosClient.get(`${INSTALACIONES.GET_BY_FILTER}?finca=${fincaSeleccionada}`);
      console.log(response.data);
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

      const response = await axiosClient.get(`${ANIMALES.GET_BY_FILTER}`, {});
      console.log(response.data);
      setAnimales(response.data);
    } catch (error) {
      console.error('Error al cargar animales:', error);
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
        const response = axiosClient.delete(`${ANIMALES.DELETE}/${id}`);
        response.then((data) => {
          Swal.fire({
            title: '¡Completado!',
            text: data.status === 204 ? 'Se eliminó correctamente ' : 'No se pudo eliminar',
            icon: data.status === 204 ? 'success' : 'error',
            confirmButtonColor: '#3085d6',
          });
          data.status === 204 && cargarAnimales()
        })
          .catch((error) => {
            Swal.fire({
              title: 'Error:',
              text: error.response.data.message,
              icon: 'error',
              confirmButtonColor: '#3085d6',
            });
          });
      }
    });
  }

  const handleOpenModal = (accion, data) => {
    setAccion(accion);
    if (data != "") {
      dataRef.current = data;
      handleOpen();
    }
  }


  return (
    <Paper sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ margin: '10px' }}>
        Administración de Animales.
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
        onClick={() => handleOpenModal("registrar", {})}
      >
        Agregar Animal
      </Button>

      <Box sx={{ margin: "10px", width: '100%' }}>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "calc(100% - 100px)",
            bgcolor: 'background.paper',
            boxShadow: 24,
            borderRadius: '10px',
            p: 4
          }}>
            <CrearRegistroAnimal accion={accion} data={accion === "editar" ? dataRef.current : {}} cargarAnimales={cargarAnimales} />
          </Box>
        </Modal>

      </Box >


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
