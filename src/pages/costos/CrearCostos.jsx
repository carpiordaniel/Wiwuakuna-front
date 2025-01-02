import axiosClient from '@/axios/apiClient';
import { useGetAll } from '@/components/useGetAll';
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { COLORS, COSTOS, formatDateToYYYYMMDD } from '../../globals/constantes';
import { crearInstalacionValidationSchema } from './validacion'; // Importa el esquema

export const CrearCostos = ({ accion = "registrar", data, getAllCotos }) => {
  console.log(data)


  const { dataArticulos, getAllArticulos,
    dataFinca, getAllFinca,
  } = useGetAll();

  useEffect(() => {
    getAllFinca();
    getAllArticulos();

  }, []);

  const formik = useFormik({
    initialValues: {
      id: data?.id || '',
      finca: data?.finca || '',
      articulo: data?.articulo?.toString() || '',
      fecha: data?.fecha || formatDateToYYYYMMDD(new Date()),
      valor: data?.valor || '',
    },
    validationSchema: crearInstalacionValidationSchema,
    onSubmit: async (values) => {
      console.log(values)
      let newValues = values
      if (accion == "registrar") {
        console.log("registrar")
        const { finca, articulo, fecha, valor } = values;
        newValues = { finca, articulo, fecha, valor }
      }
      try {
        const response = accion === "registrar"
          ? await axiosClient.post(`${COSTOS.POST}`, newValues)
          : await axiosClient.put(`${COSTOS.PUT}/${values.id}`, values);

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
        getAllCotos();
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
        {JSON.stringify(formik.values)}
        {JSON.stringify(formik.errors)}
        <Typography variant="h5" mb={3} align="center">
          {accion === "editar" ? "Editar Costos" : "Registrar Costos"}
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>

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


          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('articulo', value?.value)}
            name="articulo"
            id='articulo'
            onBlur={formik.handleBlur}
            error={formik.touched.articulo && Boolean(formik.errors.articulo)}
            value={dataArticulos.find((item) => item.value === formik.values.articulo) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={dataArticulos}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la articulo)
            isOptionEqualToValue={(option, value) => option.value === value?.value} // Compara opciones correctamente
            renderInput={(params) => (
              <TextField
                {...params}
                label="Articulo"
                error={formik.touched.articulo && Boolean(formik.errors.articulo)} // Muestra el error
                helperText={formik.touched.articulo && formik.errors.articulo} // Muestra el texto de ayuda del error
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
            error={formik.touched.fecha && Boolean(formik.errors.fecha)}
            helperText={formik.touched.fecha && formik.errors.fecha}
          />

          <TextField
            fullWidth
            label="Valor"
            name="valor"
            value={formik.values.valor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.valor && Boolean(formik.errors.valor)}
            helperText={formik.touched.valor && formik.errors.valor}
            type='number'
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


