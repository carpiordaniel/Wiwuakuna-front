import React, { useState, useRef, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { border, Grid } from '@mui/system';
import { Box, Button, Container, Modal, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import { COLORS, FINCAS, VETERINARIO } from '../../globals/constantes';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import { CrearRegistroVeterinario } from './CrearRegistroVeterinario';

import "./../../style.css"
import Swal from 'sweetalert2';
import axios from 'axios';
import axiosClient from '@/axios/apiClient';
import { FiltroVeterinario } from './FiltroVeterinario';

const paginationModel = { page: 0, pageSize: 5 };


export const RegistroVeterinario = () => {
  const [openFiltro, setOpenFiltro] = useState(false);

  const [open, setOpen] = useState(false);
  const [dataVeterinario, setDataVeterinario] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [accion, setAccion] = useState("");
  const dataRef = useRef(null);


  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'animal', headerName: 'Animal', flex: 1 },
    { field: 'tipo', headerName: 'Tipo', flex: 1 },
    { field: 'enfermedad', headerName: 'Enfermedad', flex: 1 },
    { field: 'diagnostico', headerName: 'Diagnostico', flex: 1 },
    { field: 'tratamiento', headerName: 'Tratamiento', flex: 1 },
    { field: 'medicamento', headerName: 'Medicamento', flex: 1 },
    { field: 'dias', headerName: 'Dias de tratamiento', flex: 1 },
    { field: 'estado', headerName: 'Estado', flex: 1 },
    { field: 'responsable', headerName: 'Responsable', flex: 1 },
    { field: 'veterinario', headerName: 'Veterinario', flex: 1 },
    { field: 'fecha', headerName: 'Fecha', flex: 1 },

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
    getAllVeterinarios();
  }, []);

  const getAllVeterinarios = async (params) => {
    try {
      const response = await axiosClient.get(VETERINARIO.GET_ALL, { params: params });
      console.log(response.data);
      setDataVeterinario(response.data);
    } catch (error) {
      console.error(error);
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
        const response = axiosClient.delete(`${VETERINARIO.DELETE}/${id}`);
        response.then((data) => {
          Swal.fire({
            title: '¡Completado!',
            text: data.status === 204 ? 'Se eliminó correctamente ' : 'No se pudo eliminar',
            icon: data.status === 204 ? 'success' : 'error',
            confirmButtonColor: '#3085d6',
          });
          data.status === 204 && getAllVeterinarios()
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
    getAllVeterinarios(filters);
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <Typography variant="h6" className="font-bold mb-4" sx={{ margin: "10px" }}>Administracion de registro de veterinario</Typography>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>

        <Button variant="contained" sx={{
          margin: "10px", cursor: 'pointer', borderRadius: '10px', color: 'white',
          backgroundColor: COLORS.PRIMARY
        }} onClick={() => handleOpenModal("registrar", {})}>Agregar veterinario</Button>

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
            <CrearRegistroVeterinario accion={accion} data={accion === "editar" ? dataRef.current : {}} getAllVeterinarios={getAllVeterinarios} />
          </Box>
        </Modal>

      </Box >
      <DataGrid
        rows={dataVeterinario}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />

      {openFiltro && <FiltroVeterinario open={openFiltro}
        setOnClose={() => setOpenFiltro(false)}
        setFilters={setFilters} />}

    </Paper >
  );
}


