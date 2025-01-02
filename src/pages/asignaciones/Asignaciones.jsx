import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, Button, Modal, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useRef, useState } from 'react';

import { CrearAsignacion } from './CrearAsignacion';

import { ASIGNACIONES, COLORS } from '@/globals/constantes';
import Swal from 'sweetalert2';
import axiosClient from '../../axios/apiClient';
import "./../../style.css";
import { FiltroAsignacion } from './FiltroAsignacion';


const paginationModel = { page: 0, pageSize: 10 };

export const Asignaciones = () => {
  const [openFiltro, setOpenFiltro] = useState(false);

  const [open, setOpen] = useState(false);
  const [dataAsignacion, setDataAsignacion] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [accion, setAccion] = useState("");
  const dataRef = useRef(null);
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'finca', headerName: 'Finca', flex: 1 },
    { field: 'responsable', headerName: 'Responsable', flex: 1 },
    {
      field: 'action', headerName: 'Action', flex: 1,
      renderCell: (params) => (
        <>
          <EditIcon color='primary' sx={{ cursor: 'pointer', margin: '5px' }} onClick={() => handleOpenModal("editar", params.row)} />
          <Delete color='error' sx={{ cursor: 'pointer', margin: '5px' }} onClick={() => handleEliminar(params.row.id)} />
        </>
      ),
    }
  ];


  useEffect(() => {
    getAllAsignaciones();
  }, []);

  const getAllAsignaciones = async (params) => {
    try {
      const response = await axiosClient.get(ASIGNACIONES.GET_ALL_ASIGNACIONES, { params: params });
      setDataAsignacion(response.data);
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
        const response = axiosClient.delete(`${ASIGNACIONES.DELETE_ASIGNACIONES}/${id}`);
        response.then((data) => {
          Swal.fire({
            title: '¡Completado!',
            text: data.status === 204 ? 'Se eliminó correctamente ' : 'No se pudo eliminar',
            icon: data.status === 204 ? 'success' : 'error',
            confirmButtonColor: '#3085d6',
          });
          data.status === 204 && getAllAsignaciones()
        })
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
    getAllAsignaciones(filters);
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <Typography variant="h6" className="font-bold mb-4" sx={{ margin: "10px" }}>Administracion de Asignaciones</Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>

        <Button variant="contained" sx={{
          margin: "10px", cursor: 'pointer', borderRadius: '10px', color: 'white',
          backgroundColor: COLORS.PRIMARY
        }} onClick={() => handleOpenModal("registrar", {})}>Agregar Asignaciones</Button>
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
            <CrearAsignacion accion={accion} data={accion === "editar" ? dataRef.current : {}} getAllAsignaciones={getAllAsignaciones} />
          </Box>
        </Modal>

      </Box >
      <DataGrid
        rows={dataAsignacion}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />


      {openFiltro && <FiltroAsignacion open={openFiltro}
        setOnClose={() => setOpenFiltro(false)}
        setFilters={setFilters} />}
    </Paper >
  );
}

