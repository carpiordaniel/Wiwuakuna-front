import axiosClient from '@/axios/apiClient';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { COLORS, UNIDADES } from '../../globals/constantes';
import { crearUnidadValidationSchema } from './validacion'; // Importa el esquema

export const CrearUnidades = ({ accion = "registrar", data, getAllUnidades }) => {
  console.log(data)

  const formik = useFormik({
    initialValues: {
      id: data?.id || '',
      nombre: data?.nombre || '',
    },
    validationSchema: crearUnidadValidationSchema,
    onSubmit: async (values) => {
      console.log(values)
      try {
        const response = accion === "registrar"
          ? await axiosClient.post(`${UNIDADES.POST}`, values)
          : await axiosClient.put(`${UNIDADES.PUT}/${values.id}`, values);

        Swal.fire({
          icon: response.status === 200 ? 'success' : 'error',
          title: response.status === 200 ? `${accion === "registrar" ? 'Creada correctamente' : 'Actualizada correctamente'}` : `${accion === "registrar" ? 'Error al crear' : 'Error al actualizar'}`,
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
      }
      finally {
        formik.resetForm();
        getAllUnidades();
      }

    },
  });


  return (
    <div>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ margin: '40px 10px', }}
      >
        {/* {JSON.stringify(formik.values)} */}
        <Typography variant="h5" mb={3} align="center">
          {accion === "editar" ? "Editar Unidad" : "Registrar Unidad"}
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>

          <TextField
            fullWidth
            label="Id"
            name="id"
            value={formik.values.id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.id && Boolean(formik.errors.id)}
            helperText={formik.touched.id && formik.errors.id}
            disabled={accion === "editar" ? true : false}
          />

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


