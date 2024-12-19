import React, { useEffect } from 'react';
import { TextField, Button, Box, Typography, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { crearFincaValidationSchema } from './validacion'; // Importa el esquema
import axios from 'axios';
import Swal from 'sweetalert2';
import { COLORS, FINCAS } from '@/globals/constantes';

const CrearFinca = ( { accion = "registrar", data } ) => {

  console.log("d")
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

  const decodeJWT = (token) => {
    try {
      const [, payload] = token.split('.');
      const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
      console.log("Payload decodificado:", decodedPayload);
      return decodedPayload;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  };
  
  useEffect(() => {
    // Ejemplo de uso
  const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJEQ0FSUElPIiwiaWF0IjoxNzM0NTc1ODAwLCJleHAiOjE3MzQ2NjIyMDB9.upuqx5bhYNXQTVKZrPu9arGkCY5UoU5NRgZ-G342qSW4N5ide-sze23BIlIIsj9onFQJqTJda5XUCytq7oTiRA"; // Reemplaza con tu token
  const payload = decodeJWT(token);
  // Verifica los datos decodificados
  if (payload) {
    console.log("Usuario:", payload.user);
    console.log("Expiración:", payload.exp);
  }
  }, []);
  
  

  

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

          <TextField
            fullWidth
            label="Dimensión"
            name="dimension"
            value={formik.values.dimension}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dimension && Boolean( formik.errors.dimension )}
            helperText={formik.touched.dimension && formik.errors.dimension}
          />

          <TextField
            fullWidth
            label="Pais"
            name="pais"
            value={formik.values.pais}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pais && Boolean( formik.errors.pais )}
            helperText={formik.touched.pais && formik.errors.pais}
          />

          <TextField
            fullWidth
            label="Ciudad"
            name="ciudad"
            value={formik.values.ciudad}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.ciudad && Boolean( formik.errors.ciudad )}
            helperText={formik.touched.ciudad && formik.errors.ciudad}
          />

          <TextField
            fullWidth
            label="Responsable"
            name="responsable"
            value={formik.values.responsable}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.responsable && Boolean( formik.errors.responsable )}
            helperText={formik.touched.responsable && formik.errors.responsable}
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
