import axiosClient from '@/axios/apiClient';
import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, Button, Modal, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { COLORS, FILAS_POR_TABLAS, MOVIMIENTOS } from '../../globals/constantes';
import "./../../style.css";
import { CrearMovimientos } from './CrearMovimientos';
import { FiltroMovimientos } from './FiltroMovimientos';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import * as XLSX from 'xlsx';



export const Movimientos = () => {
  const [openFiltro, setOpenFiltro] = useState(false);
  const paginationModel = { page: 0, pageSize: FILAS_POR_TABLAS };
  const [open, setOpen] = useState(false);
  const [dataMovimientos, setDataMovimientos] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [accion, setAccion] = useState("");
  const [accionFiltro, setAccionFiltro] = useState("");
  const dataRef = useRef(null);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'finca', headerName: 'Finca', flex: 1 },
    { field: 'instalacion', headerName: 'Instalacion', flex: 1 },
    { field: 'tipo', headerName: 'Tipo', flex: 1 },
    { field: 'fecha', headerName: 'Fecha', flex: 1 },
    { field: 'articulo', headerName: 'Articulo', flex: 1 },
    { field: 'cantidad', headerName: 'Cantidad', flex: 1 },
    { field: 'valor', headerName: 'Valor', flex: 1 },
    { field: 'responsable', headerName: 'Responsable', flex: 1 },

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
    getAllMovimientos();
  }, []);

  const getAllMovimientos = async (params) => {
    try {
      const response = await axiosClient.get(MOVIMIENTOS.GET_ALL, { params: params });
      setDataMovimientos(response.data);
      if (accionFiltro === "descargar") {
        downloadExcel(response.data); // Llama a la función de descarga
      }
    } catch (error) {
    } finally {
      setAccionFiltro("");
      setOpenFiltro(false);
    }
  };


  const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Movimientos");

    // Crear archivo Excel y descargarlo
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "movimientos.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        const response = axiosClient.delete(`${MOVIMIENTOS.DELETE}/${id}`);
        response.then((data) => {
          Swal.fire({
            title: '¡Completado!',
            text: data.status === 204 ? 'Se eliminó correctamente ' : 'No se pudo eliminar',
            icon: data.status === 204 ? 'success' : 'error',
            confirmButtonColor: '#3085d6',
          });
          data.status === 204 && getAllMovimientos()
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
    getAllMovimientos(filters);
  }

  const handleAccion = (accion) => {
    console.log(accion)
    setOpenFiltro(true)
    setAccionFiltro(accion);
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <Typography variant="h6" className="font-bold mb-4" sx={{ margin: "10px" }}>Administracion de Movimientos</Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>

        <Button variant="contained" sx={{
          margin: "10px", cursor: 'pointer', borderRadius: '10px', color: 'white',
          backgroundColor: COLORS.PRIMARY
        }} onClick={() => handleOpenModal("registrar", {})}>Agregar Instalacion</Button>
        <div>

          <SearchOutlinedIcon onClick={() => handleAccion("")}
            sx={{ margin: "10px", cursor: 'pointer', borderRadius: '10px', }
            } />
          <DownloadForOfflineIcon onClick={() => handleAccion("descargar")}
            sx={{ margin: "10px", cursor: 'pointer', borderRadius: '10px', }
            } />
        </div>


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
            <CrearMovimientos accion={accion} data={accion === "editar" ? dataRef.current : {}} getAllMovimientos={getAllMovimientos} />
          </Box>
        </Modal>

      </Box >
      <DataGrid
        rows={dataMovimientos}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />

      {openFiltro && <FiltroMovimientos open={openFiltro}
        setOnClose={() => {
          setOpenFiltro(false);
          setAccionFiltro("");
        }
        }
        setFilters={setFilters}
        accionFiltro={accionFiltro}
      />}

    </Paper >

  );
}


