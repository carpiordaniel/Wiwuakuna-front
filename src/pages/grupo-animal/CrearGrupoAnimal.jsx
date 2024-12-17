import React from 'react';
import { TextField, Button, Box, Typography, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { COLORS } from '../../globals/constantes';
import { crearGrupoAnimalValidationSchema } from './validacion'; // Importa el esquema
import axios from 'axios';
import Swal from 'sweetalert2';

export const CrearGrupoAnimal = ( { accion = "registrar", data } ) => {
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
  ];

  const formik = useFormik( {
    initialValues: {
      codigo: data?.codigo || '',
      tipoAnimal: data?.tipoAnimal || '',
      instalacion: data?.instalacion || ''
    },
    validationSchema: crearGrupoAnimalValidationSchema,
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
          {accion === "editar" ? "Editar grupo animal" : "Registro grupo animal"}
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>

          <TextField
            label="Código"
            fullWidth
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
            value={formik.values.tipoAnimal}
            onChange={( event, newValue ) => formik.setFieldValue( 'tipoAnimal', newValue )}
            renderInput={( params ) => (
              <TextField
                {...params}
                label="tipoAnimal"
                name="tipoAnimal"
                error={formik.touched.tipoAnimal && Boolean( formik.errors.tipoAnimal )}
                helperText={formik.touched.tipoAnimal && formik.errors.tipoAnimal}
              />
            )}
          />


          <Autocomplete
            disablePortal
            options={top100Films.map( ( option ) => option.label )}
            value={formik.values.instalacion}
            onChange={( event, newValue ) => formik.setFieldValue( 'instalacion', newValue )}
            renderInput={( params ) => (
              <TextField
                {...params}
                label="instalacion"
                name="instalacion"
                error={formik.touched.instalacion && Boolean( formik.errors.instalacion )}
                helperText={formik.touched.instalacion && formik.errors.instalacion}
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


