import React, { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Box, Button, Modal, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import Swal from 'sweetalert2';
import axiosClient from '../../axios/apiClient';
import { FINCAS, INSTALACIONES, COLORS, ANIMALES } from '@/globals/constantes';
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import { CrearRegistroAnimal } from './CrearRegistroAnimal';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { FiltroInstalacion } from '../instalacion/FiltroInstalacion';
import { FiltroAnimal } from './FiltroAnimal';

export const RegistroAnimal = () => {
  const [open, setOpen] = useState(false);
  const [openFiltro, setOpenFiltro] = useState(false);

  const [animales, setAnimales] = useState([]);
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
    cargarAnimales();
  }, [usuario]);


  const cargarAnimales = async (params) => {
    try {
      const response = await axiosClient.get(ANIMALES.GET_BY_FILTER, { params: params });
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
  const setFilters = (filters) => {
    console.log(filters);
    cargarAnimales(filters);
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <Typography variant="h6" sx={{ margin: '10px' }}>
        Administración de Animales.
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>

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

        <SearchOutlinedIcon onClick={() => setOpenFiltro(true)}
          sx={{ margin: "10px", cursor: 'pointer', borderRadius: '10px', }
          } />

      </div>


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

      {openFiltro && <FiltroAnimal open={openFiltro}
        setOnClose={() => setOpenFiltro(false)}
        setFilters={setFilters} />}
    </Paper>
  );
};
