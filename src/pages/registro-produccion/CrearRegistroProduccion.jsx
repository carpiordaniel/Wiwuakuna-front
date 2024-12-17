import React from 'react';
import { TextField, Button, Box, Typography, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { COLORS } from '../../globals/constantes';
import { crearRegistroProduccionValidationSchema } from './validacion'; // Importa el esquema
import axios from 'axios';
import Swal from 'sweetalert2';

export const CrearInstalacion = ( { accion = "registrar", data } ) => {
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
  ];

  const formik = useFormik( {
    initialValues: {
      animal: data?.animal || '',
      tipo: data?.tipo || '',
      fecha: data?.fecha || '',
      hora: data?.hora || '',
      cantidad: data?.cantidad || '',
      nota: data?.nota || '',
      responsable: data?.responsable || '',
    },
    validationSchema: crearRegistroProduccionValidationSchema,
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
          {accion === "editar" ? "Editar producción" : "Registrar producción"}
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
                label="Animal"
                name="animal"
                error={formik.touched.animal && Boolean( formik.errors.animal )}
                helperText={formik.touched.animal && formik.errors.animal}
              />
            )}
          />

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
            type='date'
            fullWidth

            name="fecha"
            value={formik.values.fecha}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fecha && Boolean( formik.errors.fecha )}
            helperText={formik.touched.fecha && formik.errors.fecha}
          />

          <TextField
            type='hour'
            fullWidth
            label="hora"
            name="hora"
            value={formik.values.hora}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.hora && Boolean( formik.errors.hora )}
            helperText={formik.touched.hora && formik.errors.hora}
          />

          <TextField
            fullWidth
            label="cantidad"
            name="cantidad"
            value={formik.values.cantidad}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cantidad && Boolean( formik.errors.cantidad )}
            helperText={formik.touched.cantidad && formik.errors.cantidad}
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


