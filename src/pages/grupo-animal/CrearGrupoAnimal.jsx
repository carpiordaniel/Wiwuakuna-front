import axiosClient from '@/axios/apiClient';
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { COLORS, DICCIONARIOS, GRUPO_ANIMAL, INSTALACIONES } from '../../globals/constantes';
import { crearGrupoAnimalValidationSchema } from './validacion'; // Importa el esquema

export const CrearGrupoAnimal = ({ accion = "registrar", data, getAllGrupoAnimal }) => {
  console.log(accion, data)
  const [tipoAnimal, setTipoAnimal] = useState([]);
  const [dataInstalacion, setDataInstalacion] = useState([]);

  const formik = useFormik({
    initialValues: {
      id: data?.id || '',
      codigo: data?.codigo || '',
      tipo_animal: data?.tipo_animal?.toString() || '',
      instalacion: data?.instalacion || ''
    },
    validationSchema: crearGrupoAnimalValidationSchema,
    onSubmit: async (values) => {
      console.log(values)
      let newValues = values
      if (accion == "registrar") {
        console.log("registrar")
        const { codigo, tipo_animal, instalacion } = values;
        newValues = { codigo, tipo_animal, instalacion }
      }
      try {
        const response = accion === "registrar"
          ? await axiosClient.post(`${GRUPO_ANIMAL.POST}`, newValues)
          : await axiosClient.put(`${GRUPO_ANIMAL.PUT}${values.id}`, values);

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
        getAllGrupoAnimal();
      }
    },
  });


  useEffect(() => {
    getTipoAnimal();
    getAllInstalaciones();
  }, []);

  const getTipoAnimal = async () => {
    try {
      const response = await axiosClient.get(DICCIONARIOS.GET_BY_TABLA("tipo_animal"));
      setTipoAnimal(response.data.map(tipoAnimal => ({ label: tipoAnimal.nombre, value: tipoAnimal.id_tabla })));
    } catch (error) {
      console.error('Error al obtener las fincas:', error);
    }
  }

  const getAllInstalaciones = async () => {
    try {
      const response = await axiosClient.get(`${INSTALACIONES.GET_ALL}`);
      setDataInstalacion(response.data.map(finca => ({ label: finca.nombre, value: finca.id })));
    } catch (error) {
    }
  };



  return (
    <div>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ margin: '40px 10px', }}
      >
        {/* {JSON.stringify(formik.values)}
        {JSON.stringify(formik.errors)} */}
        <Typography variant="h5" mb={3} align="center">
          {accion === "editar" ? "Editar grupo animal" : "Registro grupo animal"}
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>

          <TextField
            label="Código"
            fullWidth
            name="codigo"
            value={formik.values.codigo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.codigo && Boolean(formik.errors.codigo)}
            helperText={formik.touched.codigo && formik.errors.codigo}
          />

          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('tipo_animal', value?.value)}
            name="tipo_animal"
            id='tipo_animal'
            onBlur={formik.handleBlur}
            error={formik.touched.tipo_animal && Boolean(formik.errors.tipo_animal)}
            value={tipoAnimal.find((tipo) => tipo.value === formik.values.tipo_animal) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={tipoAnimal}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la tipo)
            isOptionEqualToValue={(option, value) => option.value === value?.value} // Compara opciones correctamente
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo Animal"
                error={formik.touched.tipo_animal && Boolean(formik.errors.tipo_animal)} // Muestra el error
                helperText={formik.touched.tipo_animal && formik.errors.tipo_animal} // Muestra el texto de ayuda del error
              />
            )}
          />

          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('instalacion', value?.value)}
            name="instalacion"
            id='instalacion'
            onBlur={formik.handleBlur}
            error={formik.touched.instalacion && Boolean(formik.errors.instalacion)}
            value={dataInstalacion.find((tipo) => tipo.value === formik.values.instalacion) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={dataInstalacion}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la tipo)
            isOptionEqualToValue={(option, value) => option.value === value?.value} // Compara opciones correctamente
            renderInput={(params) => (
              <TextField
                {...params}
                label="Instalación"
                error={formik.touched.instalacion && Boolean(formik.errors.instalacion)} // Muestra el error
                helperText={formik.touched.instalacion && formik.errors.instalacion} // Muestra el texto de ayuda del error
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


