import React, { useState, useEffect, useRef } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Box, Button, Modal, Typography, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import Swal from 'sweetalert2';
import axiosClient from '../../axios/apiClient';
import { FINCAS, COLORS, LOTES, FILAS_POR_TABLAS } from '../../globals/constantes';
import { CrearLote } from './CrearLote';
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { FiltroLote } from './FiltroLote';

export const RegistroLote = () => {
  const [open, setOpen] = useState(false);
  const [lotes, setLotes] = useState([]);
  const paginationModel = { page: 0, pageSize: FILAS_POR_TABLAS };
  const [accion, setAccion] = useState("");
  const dataRef = useRef(null);
  const [openFiltro, setOpenFiltro] = useState(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'tipo_ganado', headerName: 'Tipo Ganado', flex: 1 },
    { field: 'finca', headerName: 'Finca', flex: 1 },
    {
      field: 'action',
      headerName: 'Acción',
      flex: 1,
      renderCell: (params) => (
        <>
          <EditIcon color='primary' sx={{ cursor: 'pointer', margin: '5px' }} onClick={() => handleOpenModal("editar", params.row)} />
          <Delete color='error' sx={{ cursor: 'pointer', margin: '5px' }} onClick={() => handleEliminar(params.row.id)} />
        </>
      ),
    },
  ];



  useEffect(() => {
    cargarLotes();
  }, []);



  const cargarLotes = async (params) => {
    try {
      const response = await axiosClient.get(LOTES.GET_ALL, { params: params });
      console.log(response.data);
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
        const response = axiosClient.delete(`${LOTES.DELETE}/${id}`);
        response.then((data) => {
          Swal.fire({
            title: '¡Completado!',
            text: data.status === 204 ? 'Se eliminó correctamente ' : 'No se pudo eliminar',
            icon: data.status === 204 ? 'success' : 'error',
            confirmButtonColor: '#3085d6',
          });
          data.status === 204 && cargarLotes()
        })
          .catch((error) => {
            console.log(error)
            Swal.fire({
              title: 'Error:',
              text: error.response.data?.message,
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
    cargarLotes(filters);
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <Typography variant="h6" className="font-bold mb-4" sx={{ margin: "10px" }}>Administracion de lotes</Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>

        <Button variant="contained" sx={{
          margin: "10px", cursor: 'pointer', borderRadius: '10px', color: 'white',
          backgroundColor: COLORS.PRIMARY
        }} onClick={() => handleOpenModal("registrar", {})}>Agregar Lote</Button>
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
            <CrearLote accion={accion} data={accion === "editar" ? dataRef.current : {}}
              cargarLotes={cargarLotes} />
          </Box>
        </Modal>

      </Box >


      <DataGrid
        rows={lotes}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />


      {openFiltro && <FiltroLote open={openFiltro}
        setOnClose={() => setOpenFiltro(false)}
        setFilters={setFilters} />}

    </Paper>
  );
};
