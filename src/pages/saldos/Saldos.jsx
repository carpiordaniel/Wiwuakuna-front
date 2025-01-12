import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { FILAS_POR_TABLAS, SALDOS } from '../../globals/constantes';


import axiosClient from '@/axios/apiClient';
import "./../../style.css";
import { FiltroSaldos } from './FiltroSaldos';


export const Saldos = () => {
  const [openFiltro, setOpenFiltro] = useState(false);
  const paginationModel = { page: 0, pageSize: FILAS_POR_TABLAS };
  const [dataSaldos, setDataSaldos] = useState([]);

  const columns = [
    { field: 'finca', headerName: 'Finca', flex: 1 },
    { field: 'instalacion', headerName: 'Instalacion', flex: 1 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'articulo', headerName: 'Articulo', flex: 1 },
    { field: 'valor', headerName: 'Valor', flex: 1 },
  ];


  useEffect(() => {
    getAllSaldos();
  }, []);

  const getAllSaldos = async (params) => {
    try {
      const response = await axiosClient.get(SALDOS.GET_ALL, { params: params });
      setDataSaldos(response.data);
    } catch (error) {
    }
  };


  const setFilters = (filters) => {
    console.log(filters);
    getAllSaldos(filters);
  }
  return (
    <Paper sx={{ width: '100%' }}>
      <Typography variant="h6" className="font-bold mb-4" sx={{ margin: "10px" }}>Administracion de saldos</Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p></p>
        <SearchOutlinedIcon onClick={() => setOpenFiltro(true)}
          sx={{ margin: "10px", cursor: 'pointer', borderRadius: '10px', }
          } />
      </div>

      <DataGrid
        rows={dataSaldos}
        columns={columns}
        getRowId={(row) => row.finca + row.instalacion + row.nombre + row.articulo}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />

      {openFiltro && <FiltroSaldos open={openFiltro}
        setOnClose={() => setOpenFiltro(false)}
        setFilters={setFilters} />}

    </Paper >

  );
}


