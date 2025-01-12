import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, Button, Modal, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useRef, useState } from 'react';
import { COLORS, COSTOS, FILAS_POR_TABLAS } from '../../globals/constantes';

import axiosClient from '@/axios/apiClient';
import Swal from 'sweetalert2';
import "./../../style.css";
import { CrearCostos } from './CrearCostos';
import { FiltroCostos } from './FiltroCostos';


export const Costos = () => {
  const [openFiltro, setOpenFiltro] = useState(false);
  const paginationModel = { page: 0, pageSize: FILAS_POR_TABLAS };
  const [open, setOpen] = useState(false);
  const [dataCostos, setDataCostos] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [accion, setAccion] = useState("");
  const dataRef = useRef(null);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'finca', headerName: 'Finca', flex: 1 },
    { field: 'articulo', headerName: 'Articulo', flex: 1 },
    { field: 'fecha', headerName: 'Fecha', flex: 1 },
    { field: 'valor', headerName: 'Valor', flex: 1 },

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
    getAllCotos();
  }, []);

  const getAllCotos = async (params) => {
    try {
      const response = await axiosClient.get(COSTOS.GET_ALL, { params: params });
      setDataCostos(response.data);
    } catch (error) {
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
        const response = axiosClient.delete(`${COSTOS.DELETE}/${id}`);
        response.then((data) => {
          Swal.fire({
            title: '¡Completado!',
            text: data.status === 204 ? 'Se eliminó correctamente ' : 'No se pudo eliminar',
            icon: data.status === 204 ? 'success' : 'error',
            confirmButtonColor: '#3085d6',
          });
          data.status === 204 && getAllCotos()
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
    getAllCotos(filters);
  }
  return (
    <Paper sx={{ width: '100%' }}>
      <Typography variant="h6" className="font-bold mb-4" sx={{ margin: "10px" }}>Administracion de costos</Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>

        <Button variant="contained" sx={{
          margin: "10px", cursor: 'pointer', borderRadius: '10px', color: 'white',
          backgroundColor: COLORS.PRIMARY
        }} onClick={() => handleOpenModal("registrar", {})}>Agregar costos</Button>
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
            <CrearCostos accion={accion} data={accion === "editar" ? dataRef.current : {}} getAllCotos={getAllCotos} />
          </Box>
        </Modal>

      </Box >
      <DataGrid
        rows={dataCostos}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />

      {openFiltro && <FiltroCostos open={openFiltro}
        setOnClose={() => setOpenFiltro(false)}
        setFilters={setFilters} />}

    </Paper >

  );
}


