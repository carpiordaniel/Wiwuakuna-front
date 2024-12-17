import React, { useState, useRef, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { border, Grid } from '@mui/system';
import { Box, Button, Container, Modal, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import { COLORS } from '../../globals/constantes';

import {CrearGrupoAnimal} from './CrearGrupoAnimal';

import "./../../style.css"
import Swal from 'sweetalert2';
import axios from 'axios';


const rows = [
  { id: 1, codigo: 'Codigo 1', tipoAnimal: 'Tipo Animal 1', instalacion: 'Instalacion 1' },
  { id: 2, codigo: 'Codigo 2', tipoAnimal: 'Tipo Animal 2', instalacion: 'Instalacion 2' },
  { id: 3, codigo: 'Codigo 3', tipoAnimal: 'Tipo Animal 3', instalacion: 'Instalacion 3' },
  { id: 4, codigo: 'Codigo 4', tipoAnimal: 'Tipo Animal 4', instalacion: 'Instalacion 4' },
  { id: 5, codigo: 'Codigo 5', tipoAnimal: 'Tipo Animal 5', instalacion: 'Instalacion 5' },
];

const paginationModel = { page: 0, pageSize: 5 };


export const RegistroGrupoAnimal = () => {

  const [ open, setOpen ] = useState( false );
  const [ dataFinca, setDataFinca ] = useState([]);
  const handleOpen = () => setOpen( true );
  const handleClose = () => setOpen( false );
  const [ accion, setAccion ] = useState( "" );

  const columns = [
    { field: 'codigo', headerName: 'Código', flex: 1 },
    { field: 'tipoAnimal', headerName: 'Tipo Animal', flex: 1 },
    { field: 'instalacion', headerName: 'Instalacion', flex: 1 },
    
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: ( params ) => (
        <>
          <EditIcon color='primary' sx={{ cursor: 'pointer', margin: '5px' }} onClick={() => handleOpenModal( "editar" )} />
          <Delete color='error' sx={{ cursor: 'pointer', margin: '5px' }} onClick={() => handleEliminar( params.row.id )} />
        </>


      ),
    }
  ];


  useEffect( () => {
    getAllFinca();
  }, [] );

  const getAllFinca = async () => {
    try {
      const response = await axios.get( `${FINCAS.GET_FINCA}` );
      console.log( response.data );
      setDataFinca( response.data );
    } catch ( error ) {
      console.error( error );
    }
  };

  const handleEliminar = ( id ) => {
    Swal.fire( {
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    } ).then( ( result ) => {
      if ( result.isConfirmed ) {
        const response = axios.delete( `${FINCAS.DELETE_FINCA}/${id}` );
        Swal.fire( '¡Completado!', response.status === 200 ? response.data.message : 'No se pudo eliminar', response.status === 200 ? 'success' : 'error' );
      }
    } );


  }
  const handleOpenModal = ( dato ) => {
    setAccion( dato );
    if ( dato != "" ) {
      handleOpen();
    }
  }


  return (
    <Paper sx={{ width: '100%' }}>
      <Typography variant="h6" className="font-bold mb-4" sx={{ margin: "10px" }}>Administracion de grupo animal</Typography>

      <Button variant="contained" sx={{
        margin: "10px", cursor: 'pointer', borderRadius: '10px', color: 'white',
        backgroundColor: COLORS.PRIMARY
      }} onClick={() => handleOpenModal( "crear" )}>Agregar grupo animal</Button>

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
            <CrearGrupoAnimal accion={accion} />
          </Box>
        </Modal>

      </Box >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[ 5, 10 ]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper >
  );
}


