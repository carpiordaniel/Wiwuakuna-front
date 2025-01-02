import axiosClient from '@/axios/apiClient';
import { useGetAll } from '@/components/useGetAll';
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { ARTICULOS, COLORS } from '../../globals/constantes';
import { crearActiculoValidationSchema } from './validacion'; // Importa el esquema

export const CrearArticulos = ({ accion = "registrar", data, getAllArticulos }) => {
  console.log(data)


  const { unidades, getAllUnidades
  } = useGetAll();

  useEffect(() => {
    getAllUnidades();
  }, []);
  const formik = useFormik({
    initialValues: {
      codigo: data?.codigo || '',
      descripcion: data?.descripcion || '',
      unidad: data?.unidad || '',
    },
    validationSchema: crearActiculoValidationSchema,
    onSubmit: async (values) => {
      console.log(values)
      try {
        const response = accion === "registrar"
          ? await axiosClient.post(`${ARTICULOS.POST}`, values)
          : await axiosClient.put(`${ARTICULOS.PUT}/${values.codigo}`, values);

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
        getAllArticulos();
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
          {accion === "editar" ? "Editar Articulo" : "Registrar Articulo"}
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>

          <TextField
            fullWidth
            label="Codigo"
            name="codigo"
            value={formik.values.codigo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.codigo && Boolean(formik.errors.codigo)}
            helperText={formik.touched.codigo && formik.errors.codigo}
            disabled={accion === "editar" ? true : false}
          />

          <TextField
            fullWidth
            label="Descripcion"
            name="descripcion"
            value={formik.values.descripcion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
            helperText={formik.touched.descripcion && formik.errors.descripcion}
          />

          <Autocomplete
            onChange={(event, value) => {
              formik.setFieldValue('unidad', value?.value)
            }}
            name="unidad"
            id='unidad'
            onBlur={formik.handleBlur}
            error={formik.touched.unidad && Boolean(formik.errors.unidad)}
            value={unidades.find((item) => item.value === formik.values.unidad) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={unidades}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la unidad)
            isOptionEqualToValue={(option, value) => option.value === value?.value} // Compara opciones correctamente
            renderInput={(params) => (
              <TextField
                {...params}
                label="unidad"
                error={formik.touched.unidad && Boolean(formik.errors.unidad)} // Muestra el error
                helperText={formik.touched.unidad && formik.errors.unidad} // Muestra el texto de ayuda del error
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


