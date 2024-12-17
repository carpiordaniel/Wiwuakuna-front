import React from 'react';
import { TextField, Button, Box, Typography, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { COLORS } from '../../globals/constantes';
import { crearRegistroReproduccionValidationSchema } from './validacion'; // Importa el esquema
import axios from 'axios';
import Swal from 'sweetalert2';

export const CrearRegistroReproduccion = ( { accion = "registrar", data } ) => {
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
  ];

  const formik = useFormik( {
    initialValues: {
      animal: data?.animal || '',
      fecha: data?.fecha || '',
      tipo: data?.tipo || '',
      sexo: data?.sexo || '',
      encargado: data?.encargado || '',
      nota: data?.nota || '',
      estado: data?.estado || '',
    },
    validationSchema: crearRegistroReproduccionValidationSchema,
    onSubmit: async ( values ) => {
      try {
        // Espera a que la solicitud axios termine
        const response = await axios.post( `${FINCAS.POST_FINCA}`, values );

        Swal.fire( {
          icon: response.status === 200 ? 'success' : 'error',
          title: response.status === 200 ? 'Finca creada correctamente' : 'Error al crear la finca',
          showConfirmButton: false,
          timer: 2000,
        } );
      } catch ( error ) {
        console.error( 'Error al enviar el formulario:', error );
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
          {accion === "editar" ? "Editar registro de reproducción" : "Registro de reproducción"}
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>

          <Autocomplete
            disablePortal
            options={top100Films.map( ( option ) => option.label )}
            value={formik.values.animal}
            onChange={( event, newValue ) => formik.setFieldValue( 'animal', newValue )}
            renderInput={( params ) => (
              <TextField
                {...params}
                label="animal"
                name="animal"
                error={formik.touched.animal && Boolean( formik.errors.animal )}
                helperText={formik.touched.animal && formik.errors.animal}
              />
            )}
          />

          <TextField
            type='date'
            fullWidth
            name="fecha"
            value={formik.values.fecha}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fecha && Boolean( formik.errors.fecha )}
            helperText={formik.touched.fecha && formik.errors.fecha}
          />

          <Autocomplete
            disablePortal
            options={top100Films.map( ( option ) => option.label )}
            value={formik.values.tipo}
            onChange={( event, newValue ) => formik.setFieldValue( 'tipo', newValue )}
            renderInput={( params ) => (
              <TextField
                {...params}
                label="tipo"
                name="tipo"
                error={formik.touched.tipo && Boolean( formik.errors.tipo )}
                helperText={formik.touched.tipo && formik.errors.tipo}
              />
            )}
          />

          <Autocomplete
            disablePortal
            options={top100Films.map( ( option ) => option.label )}
            value={formik.values.sexo}
            onChange={( event, newValue ) => formik.setFieldValue( 'sexo', newValue )}
            renderInput={( params ) => (
              <TextField
                {...params}
                label="sexo"
                name="sexo"
                error={formik.touched.sexo && Boolean( formik.errors.sexo )}
                helperText={formik.touched.sexo && formik.errors.sexo}
              />
            )}
          />


          <Autocomplete
            disablePortal
            options={top100Films.map( ( option ) => option.label )}
            value={formik.values.encargado}
            onChange={( event, newValue ) => formik.setFieldValue( 'encargado', newValue )}
            renderInput={( params ) => (
              <TextField
                {...params}
                label="encargado"
                name="encargado"
                error={formik.touched.encargado && Boolean( formik.errors.encargado )}
                helperText={formik.touched.encargado && formik.errors.encargado}
              />
            )}
          />

          <TextField
            fullWidth
            label="nota"
            name="nota"
            value={formik.values.nota}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nota && Boolean( formik.errors.nota )}
            helperText={formik.touched.nota && formik.errors.nota}
          />

          <Autocomplete
            disablePortal
            options={top100Films.map( ( option ) => option.label )}
            value={formik.values.estado}
            onChange={( event, newValue ) => formik.setFieldValue( 'estado', newValue )}
            renderInput={( params ) => (
              <TextField
                {...params}
                label="estado"
                name="estado"
                error={formik.touched.estado && Boolean( formik.errors.estado )}
                helperText={formik.touched.estado && formik.errors.estado}
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
}


