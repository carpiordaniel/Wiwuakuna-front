import axiosClient from '@/axios/apiClient';
import { useGetAll } from '@/components/useGetAll';
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { COLORS, formatDateToYYYYMMDD, REPRODUCCION } from '../../globals/constantes';
import { crearRegistroReproduccionValidationSchema } from './validacion'; // Importa el esquema

export const CrearRegistroReproduccion = ({ accion = "registrar", data, getAllReproduccion }) => {
  const { responsables, getAllResponsables, animales, getAllAnimales,
    tipoReProduccion, getAllTipoReProduccion, estadoReProduccion, getAllEstadoReProduccion
  } = useGetAll();


  useEffect(() => {
    getAllResponsables();
    getAllAnimales();
    getAllTipoReProduccion();
    getAllEstadoReProduccion();
  }, []);

  const formik = useFormik({
    initialValues: {
      id: data?.id || '',
      animal: data?.animal || '',
      fecha: data?.fecha || formatDateToYYYYMMDD(new Date()),
      tipo: data?.tipo?.toString() || '',
      macho: data?.macho || '',
      responsable: data?.responsable || '',
      nota: data?.nota || '',
      estado: data?.estado?.toString() || '',
    },
    validationSchema: crearRegistroReproduccionValidationSchema,

    onSubmit: async (values) => {
      console.log(values)
      let newValues = values
      if (accion == "registrar") {
        console.log("registrar")
        const { animal, fecha, tipo, macho, responsable, nota, estado } = values;
        newValues = { animal, fecha, tipo, macho, responsable, nota, estado }
      }
      try {
        const response = accion === "registrar"
          ? await axiosClient.post(`${REPRODUCCION.POST}`, newValues)
          : await axiosClient.put(`${REPRODUCCION.PUT}/${values.id}`, values);

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
        getAllReproduccion();
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
        <Typography variant="h5" mb={3} align="center">
          {accion === "editar" ? "Editar registro de reproducción" : "Registro de reproducción"}
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>

          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('animal', value?.value)}
            name="animal"
            id='animal'
            onBlur={formik.handleBlur}
            error={formik.touched.animal && Boolean(formik.errors.animal)}
            value={animales.find((item) => item.value === formik.values.animal) || null}
            sablePortal
            options={animales}
            getOptionLabel={(option) => option.label || ''}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Hembra"
                error={formik.touched.animal && Boolean(formik.errors.animal)}
                helperText={formik.touched.animal && formik.errors.animal}
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
          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('tipo', value?.value)}
            name="tipo"
            id='tipo'
            onBlur={formik.handleBlur}
            error={formik.touched.tipo && Boolean(formik.errors.tipo)}
            value={tipoReProduccion.find((tipo) => tipo.value === formik.values.tipo) || null}
            sablePortal
            options={tipoReProduccion}
            getOptionLabel={(option) => option.label || ''}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo"
                error={formik.touched.tipo && Boolean(formik.errors.tipo)}
                helperText={formik.touched.tipo && formik.errors.tipo}
              />
            )}
          />

          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('macho', value?.value)}
            name="macho"
            id='macho'
            onBlur={formik.handleBlur}
            error={formik.touched.macho && Boolean(formik.errors.macho)}
            value={animales.find((item) => item.value === formik.values.macho) || null}
            sablePortal
            options={animales}
            getOptionLabel={(option) => option.label || ''}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Macho"
                error={formik.touched.macho && Boolean(formik.errors.macho)}
                helperText={formik.touched.macho && formik.errors.macho}
              />
            )}
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
            onChange={(event, value) => formik.setFieldValue('estado', value?.value)}
            name="estado"
            id='estado'
            onBlur={formik.handleBlur}
            error={formik.touched.estado && Boolean(formik.errors.estado)}
            value={estadoReProduccion.find((tipo) => tipo.value === formik.values.estado) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={estadoReProduccion}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la tipo)
            isOptionEqualToValue={(option, value) => option.value === value?.value} // Compara opciones correctamente
            renderInput={(params) => (
              <TextField
                {...params}
                label="Estado"
                error={formik.touched.estado && Boolean(formik.errors.estado)} // Muestra el error
                helperText={formik.touched.estado && formik.errors.estado} // Muestra el texto de ayuda del error
              />
            )}
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


