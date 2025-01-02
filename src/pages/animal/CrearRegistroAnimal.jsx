import axiosClient from '@/axios/apiClient';
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { ANIMALES, COLORS, DICCIONARIOS, ESTADO_ANIMAL, FINCAS, GRUPO_ANIMAL, LISTA_SEXO_ANIMAL, LOTES } from '../../globals/constantes';
import { crearRegistroAnimalValidationSchema } from './validacion'; // Importa el esquema

export const CrearRegistroAnimal = ({ accion = "registrar", data, cargarAnimales }) => {

  const [tipoAnimal, setTipoAnimal] = useState([]);
  const [lotes, setLotes] = useState([]);
  const [dataGrupoAnimal, setDataGrupoAnimal] = useState([]);
  const [dataFinca, setDataFinca] = useState([]);

  console.log(data)
  const formik = useFormik({
    initialValues: {
      id: data?.id || '',
      tipo: data?.tipo?.toString() || '',
      sexo: data?.sexo || '',
      lote: data?.lote || '',
      estado: data?.estado || '',
      nombre: data?.nombre || '',
      grupo: data?.grupo || '',
      finca: data?.finca || '',
    },
    validationSchema: crearRegistroAnimalValidationSchema,
    onSubmit: async (values) => {
      console.log(values)
      let newValues = values
      if (accion == "registrar") {
        console.log("registrar")
        const { tipo, sexo, lote, estado, nombre, grupo, finca } = values;
        newValues = { tipo, sexo, lote, estado, nombre, grupo, finca }
      }
      try {
        const response = accion === "registrar"
          ? await axiosClient.post(`${ANIMALES.POST}`, newValues)
          : await axiosClient.put(`${ANIMALES.PUT}/${values.id}`, values);

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
        cargarAnimales();
      }
    },
  });


  useEffect(() => {
    getTipoAnimal();
    cargarLotes();
    getAllGrupoAnimal();
    getAllFinca();
  }, []);

  const getTipoAnimal = async () => {
    try {
      const response = await axiosClient.get(DICCIONARIOS.GET_BY_TABLA("tipo_animal"));
      setTipoAnimal(response.data.map(tipoAnimal => ({ label: tipoAnimal.nombre, value: tipoAnimal.id_tabla })));
    } catch (error) {
      console.error('Error al obtener las fincas:', error);
    }
  }
  const cargarLotes = async () => {
    try {
      const response = await axiosClient.get(`${LOTES.GET_ALL}`);
      setLotes(response.data.map(lote => ({ label: lote.nombre, value: lote.id })));
    } catch (error) {
      console.error('Error al cargar lotes:', error);
    }
  };

  const getAllGrupoAnimal = async () => {
    try {
      const response = await axiosClient.get(`${GRUPO_ANIMAL.GET_ALL}`);
      setDataGrupoAnimal(response.data.map(grupo => ({ label: grupo.codigo, value: grupo.id })));
    } catch (error) {
      console.error(error);
    }
  };

  const getAllFinca = async () => {
    try {
      const response = await axiosClient.get(`${FINCAS.GET_FINCA}`);
      setDataFinca(response.data.map(finca => ({ label: finca.nombre, value: finca.id })));
    } catch (error) {
      console.error(error);
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
          {accion === "editar" ? "Editar registro de animal" : "Registro de animal"}
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>

          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('tipo', value?.value)}
            name="tipo"
            id='tipo'
            onBlur={formik.handleBlur}
            error={formik.touched.tipo && Boolean(formik.errors.tipo)}
            value={tipoAnimal.find((tipo) => tipo.value === formik.values.tipo) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={tipoAnimal}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la tipo)
            isOptionEqualToValue={(option, value) => option.value === value?.value} // Compara opciones correctamente
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo de animal"
                error={formik.touched.tipo && Boolean(formik.errors.tipo)} // Muestra el error
                helperText={formik.touched.tipo && formik.errors.tipo} // Muestra el texto de ayuda del error
              />
            )}
          />

          <Autocomplete
            disablePortal
            options={LISTA_SEXO_ANIMAL.map((option) => option.label)}
            value={formik.values.sexo}
            onChange={(event, newValue) => formik.setFieldValue('sexo', newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="sexo"
                name="sexo"
                error={formik.touched.sexo && Boolean(formik.errors.sexo)}
                helperText={formik.touched.sexo && formik.errors.sexo}
              />
            )}
          />

          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('lote', value?.value)}
            name="lote"
            id='lote'
            onBlur={formik.handleBlur}
            error={formik.touched.lote && Boolean(formik.errors.lote)}
            value={lotes.find((tipo) => tipo.value === formik.values.lote) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={lotes}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la tipo)
            isOptionEqualToValue={(option, value) => option.value === value?.value} // Compara opciones correctamente
            renderInput={(params) => (
              <TextField
                {...params}
                label="Lote"
                error={formik.touched.lote && Boolean(formik.errors.lote)} // Muestra el error
                helperText={formik.touched.lote && formik.errors.lote} // Muestra el texto de ayuda del error
              />
            )}
          />


          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('estado', value?.value)}
            name="estado"
            id='estado'
            onBlur={formik.handleBlur}
            error={formik.touched.estado && Boolean(formik.errors.estado)}
            value={ESTADO_ANIMAL.find((tipo) => tipo.value === formik.values.estado) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={ESTADO_ANIMAL}
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


          <TextField
            fullWidth
            label="nombre"
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
          />


          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('grupo', value?.value)}
            name="grupo"
            id='grupo'
            onBlur={formik.handleBlur}
            error={formik.touched.grupo && Boolean(formik.errors.grupo)}
            value={dataGrupoAnimal.find((tipo) => tipo.value === formik.values.grupo) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={dataGrupoAnimal}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la tipo)
            isOptionEqualToValue={(option, value) => option.value === value?.value} // Compara opciones correctamente
            renderInput={(params) => (
              <TextField
                {...params}
                label="Grupo animal"
                error={formik.touched.grupo && Boolean(formik.errors.grupo)} // Muestra el error
                helperText={formik.touched.grupo && formik.errors.grupo} // Muestra el texto de ayuda del error
              />
            )}
          />


          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('finca', value?.value)}
            name="finca"
            id='finca'
            onBlur={formik.handleBlur}
            error={formik.touched.finca && Boolean(formik.errors.finca)}
            value={dataFinca.find((tipo) => tipo.value === formik.values.finca) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={dataFinca}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la tipo)
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
}


