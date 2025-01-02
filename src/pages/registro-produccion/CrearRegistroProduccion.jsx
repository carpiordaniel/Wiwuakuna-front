import axiosClient from '@/axios/apiClient';
import { useGetAll } from '@/components/useGetAll';
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { COLORS, formatDateToYYYYMMDD, PRODUCCION } from '../../globals/constantes';
import { crearRegistroProduccionValidationSchema } from './validacion'; // Importa el esquema

export const CrearRegistroProduccion = ({ accion = "registrar", data, getAllProduccion }) => {


  const { responsables, getAllResponsables,
    animales, getAllAnimales,
    tipoProduccion, getAllTipoProduccion
  } = useGetAll();

  useEffect(() => {
    getAllAnimales();
    getAllTipoProduccion();
    getAllResponsables();
  }, []);
  console.log(data)

  const formik = useFormik({
    initialValues: {
      id: data?.id || '',
      animal: data?.animal || '',
      tipo: data?.tipo?.toString() || '',
      fecha: data?.fecha || formatDateToYYYYMMDD(new Date()),
      cantidad: data?.cantidad || '',
      nota: data?.nota || '',
      responsable: data?.responsable || '',
    },
    validationSchema: crearRegistroProduccionValidationSchema,
    onSubmit: async (values) => {
      console.log(values)
      let newValues = values
      if (accion == "registrar") {
        console.log("registrar")
        const { animal, tipo, fecha, cantidad, nota, responsable } = values;
        newValues = { animal, tipo, fecha, cantidad, nota, responsable }
      }
      try {
        const response = accion === "registrar"
          ? await axiosClient.post(`${PRODUCCION.POST}`, newValues)
          : await axiosClient.put(`${PRODUCCION.PUT}/${values.id}`, values);

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
        getAllProduccion();
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
          {accion === "editar" ? "Editar producción" : "Registrar producción"}
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>


          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('animal', value?.value)}
            name="animal"
            id='animal'
            onBlur={formik.handleBlur}
            error={formik.touched.animal && Boolean(formik.errors.animal)}
            value={animales.find((item) => item.value === formik.values.animal) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={animales}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la tipo)
            isOptionEqualToValue={(option, value) => option.value === value?.value} // Compara opciones correctamente
            renderInput={(params) => (
              <TextField
                {...params}
                label="Animal"
                error={formik.touched.animal && Boolean(formik.errors.animal)} // Muestra el error
                helperText={formik.touched.animal && formik.errors.animal} // Muestra el texto de ayuda del error
              />
            )}
          />

          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('tipo', value?.value)}
            name="tipo"
            id='tipo'
            onBlur={formik.handleBlur}
            error={formik.touched.tipo && Boolean(formik.errors.tipo)}
            value={tipoProduccion.find((item) => item.value === formik.values.tipo) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={tipoProduccion}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la tipo)
            isOptionEqualToValue={(option, value) => option.value === value?.value} // Compara opciones correctamente
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo de reproducción"
                error={formik.touched.tipo && Boolean(formik.errors.tipo)} // Muestra el error
                helperText={formik.touched.tipo && formik.errors.tipo} // Muestra el texto de ayuda del error
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
            label="cantidad"
            name="cantidad"
            value={formik.values.cantidad}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cantidad && Boolean(formik.errors.cantidad)}
            helperText={formik.touched.cantidad && formik.errors.cantidad}
            type='number'
          />

          <TextField
            fullWidth
            label="nota"
            name="nota"
            value={formik.values.nota}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nota && Boolean(formik.errors.nota)}
            helperText={formik.touched.nota && formik.errors.nota}
          />

          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('responsable', value?.value)}
            name="responsable"
            id='responsable'
            onBlur={formik.handleBlur}
            error={formik.touched.responsable && Boolean(formik.errors.responsable)}
            value={responsables.find((tipo) => tipo.value === formik.values.responsable) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={responsables}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la tipo)
            isOptionEqualToValue={(option, value) => option.value === value?.value} // Compara opciones correctamente
            renderInput={(params) => (
              <TextField
                {...params}
                label="responsable"
                error={formik.touched.responsable && Boolean(formik.errors.responsable)} // Muestra el error
                helperText={formik.touched.responsable && formik.errors.responsable} // Muestra el texto de ayuda del error
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


