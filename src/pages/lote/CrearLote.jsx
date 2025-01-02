import { useGetAll } from '@/components/useGetAll';
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import axiosClient from '../../axios/apiClient';
import { COLORS, LOTES } from '../../globals/constantes';
import { crearLoteValidationSchema } from './validacion'; // Importa el esquema

export const CrearLote = ({ accion = "registrar", data, fincaId, cargarLotes }) => {

  const { dataFinca, getAllFinca,
    tipoAnimal, getTipoAnimal,
  } = useGetAll();


  useEffect(() => {
    getTipoAnimal();
    getAllFinca();
  }, []);


  const formik = useFormik({
    initialValues: {
      id: data?.id || '',
      nombre: data?.nombre || '',
      tipo_ganado: data?.tipo_ganado?.toString() || '',
      finca: data?.finca || '',
    },
    validationSchema: crearLoteValidationSchema,
    onSubmit: async (values) => {
      let newValues = values
      if (accion == "registrar") {
        console.log("registrar")
        const { nombre, tipo_ganado, finca } = values;
        newValues = { nombre, tipo_ganado, finca }
      }
      try {
        const response = accion === "registrar"
          ? await axiosClient.post(`${LOTES.POST}`, newValues)
          : await axiosClient.put(`${LOTES.PUT}/${values.id}`, values);

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
        cargarLotes();
      }

    },
  });
  return (
    <div>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ margin: '40px 10px' }}
      >
        <Typography variant="h5" mb={3} align="center">
          {accion === "editar" ? "Editar Lote" : "Registrar Lote"}
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>
          <TextField
            label="Nombre"
            fullWidth
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
          />

          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('tipo_ganado', value?.value)}
            name="tipo_ganado"
            id='tipo_ganado'
            onBlur={formik.handleBlur}
            error={formik.touched.tipo_ganado && Boolean(formik.errors.tipo_ganado)}
            value={tipoAnimal.find((item) => item.value === formik.values.tipo_ganado) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={tipoAnimal}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la tipo_ganado)
            isOptionEqualToValue={(option, value) => option.value === value?.value} // Compara opciones correctamente
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo de ganado"
                error={formik.touched.tipo_ganado && Boolean(formik.errors.tipo_ganado)} // Muestra el error
                helperText={formik.touched.tipo_ganado && formik.errors.tipo_ganado} // Muestra el texto de ayuda del error
              />
            )}
          />
          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('finca', value?.value)}
            name="finca"
            id='finca'
            onBlur={formik.handleBlur}
            error={formik.touched.finca && Boolean(formik.errors.finca)}
            value={dataFinca.find((finca) => finca.value === formik.values.finca) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={dataFinca}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la finca)
            isOptionEqualToValue={(option, value) => option.value === value?.value} // Compara opciones correctamente
            renderInput={(params) => (
              <TextField
                {...params}
                label="Finca"
                error={formik.touched.finca && Boolean(formik.errors.finca)} // Muestra el error
                helperText={formik.touched.finca && formik.errors.finca} // Muestra el texto de ayuda del error
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
};
