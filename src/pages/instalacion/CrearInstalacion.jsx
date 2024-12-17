import React from 'react';
import { TextField, Button, Box, Typography, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { COLORS } from '../../globals/constantes';
import { crearInstalacionValidationSchema } from './validacion'; // Importa el esquema
import axios from 'axios';
import Swal from 'sweetalert2';

export const CrearInstalacion = ( { accion = "registrar", data } ) => {
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
  ];

  const formik = useFormik( {
    initialValues: {
      tipo: data?.tipo || '',
      finca: data?.finca || '',
      nombre: data?.nombre || '',
      responsable: data?.responsable || '',
    },
    validationSchema: crearInstalacionValidationSchema,
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
          {accion === "editar" ? "Editar Instalación" : "Registrar Instalación"}
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

          <Autocomplete
            disablePortal
            options={top100Films.map( ( option ) => option.label )}
            value={formik.values.finca}
            onChange={( event, newValue ) => formik.setFieldValue( 'finca', newValue )}
            renderInput={( params ) => (
              <TextField
                {...params}
                label="Finca"
                name="finca"
                error={formik.touched.finca && Boolean( formik.errors.finca )}
                helperText={formik.touched.finca && formik.errors.finca}
              />
            )}
          />

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
}


