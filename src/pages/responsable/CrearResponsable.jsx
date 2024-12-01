import React from 'react';
import { TextField, Button, Box, Typography, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { COLORS, ENDPOINTS } from '../../globals/constantes';
import { crearResponsableValidationSchema } from './validacion'; // Importa el esquema
import axios from 'axios';
import Swal from 'sweetalert2';

export const CrearResponsable = ( { accion = "registrar", data } ) => {
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
  ];

  const formik = useFormik( {
    initialValues: {
      tipo: data?.tipo || '',
      nombre: data?.nombre || '',
      apellido: data?.apellido || '',
      correo: data?.correo || '',
      cedula: data?.cedula || '',
    },
    validationSchema: crearResponsableValidationSchema,
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
          {accion === "editar" ? "Editar responsable" : "Registro responsable"}
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
            label="nombre"
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nombre && Boolean( formik.errors.nombre )}
            helperText={formik.touched.nombre && formik.errors.nombre}
          />

          <TextField
            fullWidth
            label="apellido"
            name="apellido"
            value={formik.values.apellido}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.apellido && Boolean( formik.errors.apellido )}
            helperText={formik.touched.apellido && formik.errors.apellido}
          />
          <TextField
            fullWidth
            label="correo"
            name="correo"
            value={formik.values.correo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.correo && Boolean( formik.errors.correo )}
            helperText={formik.touched.correo && formik.errors.correo}
          />
          <TextField
            fullWidth
            label="cedula"
            name="cedula"
            value={formik.values.cedula}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cedula && Boolean( formik.errors.cedula )}
            helperText={formik.touched.cedula && formik.errors.cedula}
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


