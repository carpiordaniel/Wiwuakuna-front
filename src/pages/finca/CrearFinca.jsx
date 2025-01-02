import { COLORS, FINCAS } from '@/globals/constantes';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import axiosClient from '../../axios/apiClient';
import { crearFincaValidationSchema } from './validacion'; // Importa el esquema

const CrearFinca = ({ accion = "registrar", data, getAllFinca }) => {
  const formik = useFormik({
    initialValues: {
      id: data?.id || null,
      nombre: data?.nombre || '',
      dimension: data?.dimension || '',
      pais: data?.pais || '',
      ciudad: data?.ciudad || '',
      responsable: data?.responsable || localStorage.getItem('USUARIO') || 'SIN RESPONSABLE',
    },
    validationSchema: crearFincaValidationSchema,
    onSubmit: async (values) => {
      let newValues = values
      if (accion == "registrar") {
        console.log("registrar")
        const { nombre, dimension, pais, ciudad, responsable } = values;
        newValues = { nombre, dimension, pais, ciudad, responsable }
      }
      try {
        const response = accion === "registrar"
          ? await axiosClient.post(`${FINCAS.POST_FINCA}`, newValues)
          : await axiosClient.put(`${FINCAS.PUT_FINCA}${data.id}`, values);

        Swal.fire({
          icon: response.status === 200 ? 'success' : 'error',
          title: response.status === 200 ? `${accion === "registrar" ? 'Finca creada correctamente' : 'Finca actualizada correctamente'}` : `${accion === "registrar" ? 'Error al crear la finca' : 'Error al actualizar la finca'}`,
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error:',
          text: error.response.data.message,
          showConfirmButton: false,
          timer: 3000,
        });
      } finally {
        formik.resetForm();
        getAllFinca();
      }
    },
  });

  return (
    <>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ margin: '40px 10px', }}
      >
        {/* {JSON.stringify( formik.values )}
        {JSON.stringify( formik.errors )} */}
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
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
          />

          <TextField
            fullWidth
            label="Dimensión"
            name="dimension"
            value={formik.values.dimension}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dimension && Boolean(formik.errors.dimension)}
            helperText={formik.touched.dimension && formik.errors.dimension}
          />

          <TextField
            fullWidth
            label="Pais"
            name="pais"
            value={formik.values.pais}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.pais && Boolean(formik.errors.pais)}
            helperText={formik.touched.pais && formik.errors.pais}
          />

          <TextField
            fullWidth
            label="Ciudad"
            name="ciudad"
            value={formik.values.ciudad}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.ciudad && Boolean(formik.errors.ciudad)}
            helperText={formik.touched.ciudad && formik.errors.ciudad}
          />

          <TextField
            disabled={accion === "registrar" ? true : false}
            fullWidth
            label="Responsable"
            name="responsable"
            value={formik.values.responsable}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.responsable && Boolean(formik.errors.responsable)}
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
    </>
  );
};

export default CrearFinca;
