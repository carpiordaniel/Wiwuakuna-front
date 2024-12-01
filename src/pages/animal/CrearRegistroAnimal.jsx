import React from 'react';
import { TextField, Button, Box, Typography, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { COLORS, ENDPOINTS } from '../../globals/constantes';
import { crearRegistroAnimalValidationSchema } from './validacion'; // Importa el esquema
import axios from 'axios';
import Swal from 'sweetalert2';

export const CrearRegistroAnimal = ( { accion = "registrar", data } ) => {
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
  ];

  const formik = useFormik( {
    initialValues: {
      tipo: data?.tipo || '',
      codigo: data?.codigo || '',
      sexo: data?.sexo || '',
      lote: data?.lote || '',
      estado: data?.estado || '',
      nombre: data?.nombre || '',
      grupo: data?.grupo || '',
    },
    validationSchema: crearRegistroAnimalValidationSchema,
    onSubmit: async ( values ) => {
      try {
        // Espera a que la solicitud axios termine
        const response = await axios.post( `${ENDPOINTS.POST_FINCA}`, values );

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
          {accion === "editar" ? "Editar registro de animal" : "Registro de animal"}
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>

          <Autocomplete
            disablePortal
            options={top100Films.map( ( option ) => option.label )}
            value={formik.values.tipo}
            onChange={( event, newValue ) => formik.setFieldValue( 'tipo', newValue )}
            renderInput={( params ) => (
              <TextField
                {...params}
                label="Tipo"
                name="tipo"
                error={formik.touched.tipo && Boolean( formik.errors.tipo )}
                helperText={formik.touched.tipo && formik.errors.tipo}
              />
            )}
          />

          <TextField
            fullWidth
            label="codigo"
            name="codigo"
            value={formik.values.codigo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.codigo && Boolean( formik.errors.codigo )}
            helperText={formik.touched.codigo && formik.errors.codigo}
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

          <TextField
            fullWidth
            label="lote"
            name="lote"
            value={formik.values.lote}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lote && Boolean( formik.errors.lote )}
            helperText={formik.touched.lote && formik.errors.lote}
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


          <TextField
            fullWidth
            label="nombre"
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
            value={formik.values.grupo}
            onChange={( event, newValue ) => formik.setFieldValue( 'grupo', newValue )}
            renderInput={( params ) => (
              <TextField
                {...params}
                label="grupo"
                name="grupo"
                error={formik.touched.grupo && Boolean( formik.errors.grupo )}
                helperText={formik.touched.grupo && formik.errors.grupo}
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


