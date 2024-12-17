import React from 'react';
import { TextField, Button, Box, Typography, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { COLORS, ENDPOINTS } from '../../globals/constantes';
import { crearRegistroVeterinarioValidationSchema } from './validacion'; // Importa el esquema
import axios from 'axios';
import Swal from 'sweetalert2';

export const CrearRegistroVeterinario = ( { accion = "registrar", data } ) => {
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
  ];

  const formik = useFormik( {
    initialValues: {
      animal: data?.animal || '',
      tipo: data?.tipo || '',
      enfermedad: data?.enfermedad || '',
      diagnostico: data?.diagnostico || '',
      tratamiento: data?.tratamiento || '',
      medicamento: data?.medicamento || '',
      diasTratamiento: data?.diasTratamiento || '',
      notas: data?.notas || '',
      estado: data?.estado || '',
    },
    validationSchema: crearRegistroVeterinarioValidationSchema,
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
          {accion === "editar" ? "Editar registro veterinario" : "Registro veterinario"}
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
            fullWidth
            label="enfermedad"
            name="enfermedad"
            value={formik.values.enfermedad}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.enfermedad && Boolean( formik.errors.enfermedad )}
            helperText={formik.touched.enfermedad && formik.errors.enfermedad}
          />

          <TextField
            fullWidth
            label="diagnostico"
            name="diagnostico"
            value={formik.values.diagnostico}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.diagnostico && Boolean( formik.errors.diagnostico )}
            helperText={formik.touched.diagnostico && formik.errors.diagnostico}
          />

          <TextField
            fullWidth
            label="tratamiento"
            name="tratamiento"
            value={formik.values.tratamiento}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.tratamiento && Boolean( formik.errors.tratamiento )}
            helperText={formik.touched.tratamiento && formik.errors.tratamiento}
          />

          <TextField
            fullWidth
            label="medicamento"
            name="medicamento"
            value={formik.values.medicamento}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.medicamento && Boolean( formik.errors.medicamento )}
            helperText={formik.touched.medicamento && formik.errors.medicamento}
          />
          <TextField
            fullWidth
            label="Dias Tratamiento"
            name="diasTratamiento"
            value={formik.values.diasTratamiento}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.diasTratamiento && Boolean( formik.errors.diasTratamiento )}
            helperText={formik.touched.diasTratamiento && formik.errors.diasTratamiento}
          />
          <TextField
            fullWidth
            label="notas"
            name="notas"
            value={formik.values.notas}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.notas && Boolean( formik.errors.notas )}
            helperText={formik.touched.notas && formik.errors.notas}
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


