import React from 'react';
import { TextField, Button, Box, Typography, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { COLORS, ENDPOINTS } from './../../globals/constantes';
import { crearFincaValidationSchema } from './validacion'; // Importa el esquema
import axios from 'axios';
import Swal from 'sweetalert2';

const CrearFinca = ( { accion = "registrar", data } ) => {
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
  ];

  const formik = useFormik( {
    initialValues: {
      nombre: data?.nombre || '',
      dimension: data?.dimension || '',
      pais: data?.pais || '',
      ciudad: data?.ciudad || '',
      responsable: data?.responsable || '',
    },
    validationSchema: crearFincaValidationSchema,
    onSubmit: async ( values ) => {
      console.log( 'Formulario enviado:', values );
      // Aquí puedes manejar la lógica del formulario
      try {
        console.log( 'Formulario enviado:', values );
        // Espera a que la solicitud axios termine
        const response = await axios.post( 'http://localhost:3000/finca', values );

        // Muestra el SweetAlert
        Swal.fire( {
          icon: response.status === 200 ? 'success' : 'error',
          title: response.status === 200 ? 'Finca creada correctamente' : 'Error al crear la finca',
          showConfirmButton: false,
          timer: 2000,
        } );
      } catch ( error ) {
        console.error( 'Error al enviar el formulario:', error );
        // Muestra un error si ocurre durante la solicitud
        Swal.fire( {
          icon: 'error',
          title: 'Hubo un error al procesar la solicitud',
          showConfirmButton: false,
          timer: 2000,
        } );
      }
    },
  } );


  return (
    <div>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ margin: '40px 10px', }}
      >
        <Typography variant="h5" mb={3} align="center">
          {accion === "editar" ? "Editar Finca" : "Registrar Finca"}
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>

          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nombre && Boolean( formik.errors.nombre )}
            helperText={formik.touched.nombre && formik.errors.nombre}
          />

          <Autocomplete
            disablePortal
            options={top100Films.map( ( option ) => option.label )}
            value={formik.values.dimension}
            onChange={( event, newValue ) => formik.setFieldValue( 'dimension', newValue )}
            renderInput={( params ) => (
              <TextField
                {...params}
                label="Dimensión"
                name="dimension"
                error={formik.touched.dimension && Boolean( formik.errors.dimension )}
                helperText={formik.touched.dimension && formik.errors.dimension}
              />
            )}
          />

          <Autocomplete
            disablePortal
            options={top100Films.map( ( option ) => option.label )}
            value={formik.values.pais}
            onChange={( event, newValue ) => formik.setFieldValue( 'pais', newValue )}
            renderInput={( params ) => (
              <TextField
                {...params}
                label="País"
                name="pais"
                error={formik.touched.pais && Boolean( formik.errors.pais )}
                helperText={formik.touched.pais && formik.errors.pais}
              />
            )}
          />

          <Autocomplete
            disablePortal
            options={top100Films.map( ( option ) => option.label )}
            value={formik.values.ciudad}
            onChange={( event, newValue ) => formik.setFieldValue( 'ciudad', newValue )}
            renderInput={( params ) => (
              <TextField
                {...params}
                label="Ciudad"
                name="ciudad"
                error={formik.touched.ciudad && Boolean( formik.errors.ciudad )}
                helperText={formik.touched.ciudad && formik.errors.ciudad}
              />
            )}
          />

          <Autocomplete
            disablePortal
            options={top100Films.map( ( option ) => option.label )}
            value={formik.values.responsable}
            onChange={( event, newValue ) => formik.setFieldValue( 'responsable', newValue )}
            renderInput={( params ) => (
              <TextField
                {...params}
                label="Responsable"
                name="responsable"
                error={formik.touched.responsable && Boolean( formik.errors.responsable )}
                helperText={formik.touched.responsable && formik.errors.responsable}
              />
            )}
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, width: '250px', backgroundColor: COLORS.PRIMARY, borderRadius: '10px' }}
        >
          {accion === "editar" ? "Editar" : "Registrar"}
        </Button>
      </Box>
    </div>
  );
};

export default CrearFinca;
