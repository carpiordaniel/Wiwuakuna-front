import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { ANIMALES, COLORS, DICCIONARIOS, ESTADO_ANIMAL, FINCAS, USUARIOS } from '../../globals/constantes';
import { crearRegistroVeterinarioValidationSchema } from './validacion'; // Importa el esquema
import axios from 'axios';
import Swal from 'sweetalert2';
import axiosClient from '@/axios/apiClient';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const CrearRegistroVeterinario = ({ accion = "registrar", data }) => {
  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
  ];

  const [animales, setAnimales] = useState([]);
  const [tipoAnimal, setTipoAnimal] = useState([]);
  const [responsables, setResponsables] = useState([]);
  const [value, setValue] = useState(new Date());


  const formik = useFormik({
    initialValues: {
      animal: data?.animal || '',
      tipo: data?.tipo || '',
      enfermedad: data?.enfermedad || '',
      diagnostico: data?.diagnostico || '',
      tratamiento: data?.tratamiento || '',
      medicamento: data?.medicamento || '',
      diasTratamiento: data?.diasTratamiento || '',
      notas: data?.notas || '',
      estado: data?.estado || '',
    },
    validationSchema: crearRegistroVeterinarioValidationSchema,
    onSubmit: async (values) => {
      try {
        // Espera a que la solicitud axios termine
        const response = await axios.post(`${FINCAS.POST_FINCA}`, values);

        Swal.fire({
          icon: response.status === 200 ? 'success' : 'error',
          title: response.status === 200 ? 'Finca creada correctamente' : 'Error al crear la finca',
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        Swal.fire({
          icon: 'error',
          title: 'Hubo un error al procesar la solicitud',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    },
  });



  useEffect(() => {
    cargarAnimales();
    getTipoAnimal();
    getAllResponsables();
  }, []);
  const cargarAnimales = async () => {
    try {
      const response = await axiosClient.get(`${ANIMALES.GET_ALL}`);
      console.log(response.data);
      setAnimales(response.data.map(item => ({ label: item.nombre, value: item.id })));
    } catch (error) {
      console.error('Error al obtener las fincas:', error);
    }
  }

  const getTipoAnimal = async () => {
    try {
      const response = await axiosClient.get(DICCIONARIOS.GET_BY_TABLA("tipo_animal"));
      setTipoAnimal(response.data.map(tipoAnimal => ({ label: tipoAnimal.nombre, value: tipoAnimal.id_tabla })));
    } catch (error) {
      console.error('Error al obtener las fincas:', error);
    }
  }

  const getAllResponsables = async () => {
    try {
      const response = await axiosClient.get(`${USUARIOS.GET_ALL_USUARIOS}`);
      console.log(response.data);
      setResponsables(response.data.map(finca => ({ label: finca.username, value: finca.username })));
    } catch (error) {
      console.error('Error al obtener las fincas:', error);
    }
  }


  return (
    <div>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ margin: '40px 10px', }}
      >
        {JSON.stringify(formik.values)}
        <Typography variant="h5" mb={3} align="center">
          {accion === "editar" ? "Editar registro veterinario" : "Registro veterinario"}
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>

          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('animal', value?.value)}
            name="animal"
            id='animal'
            onBlur={formik.handleBlur}
            error={formik.touched.animal && Boolean(formik.errors.animal)}
            value={animales.find((animal) => animal.value === formik.values.animal) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={animales}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la animal)
            isOptionEqualToValue={(option, value) => option.value === value?.value} // Compara opciones correctamente
            renderInput={(params) => (
              <TextField
                {...params}
                label="animal"
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
            value={tipoAnimal.find((tipo) => tipo.value === formik.values.tipo) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={tipoAnimal}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la tipo)
            isOptionEqualToValue={(option, value) => option.value === value?.value} // Compara opciones correctamente
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo Animal"
                error={formik.touched.tipo && Boolean(formik.errors.tipo)} // Muestra el error
                helperText={formik.touched.tipo && formik.errors.tipo} // Muestra el texto de ayuda del error
              />
            )}
          />

          <TextField
            fullWidth
            label="enfermedad"
            name="enfermedad"
            value={formik.values.enfermedad}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.enfermedad && Boolean(formik.errors.enfermedad)}
            helperText={formik.touched.enfermedad && formik.errors.enfermedad}
          />

          <TextField
            fullWidth
            label="diagnostico"
            name="diagnostico"
            value={formik.values.diagnostico}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.diagnostico && Boolean(formik.errors.diagnostico)}
            helperText={formik.touched.diagnostico && formik.errors.diagnostico}
          />

          <TextField
            fullWidth
            label="tratamiento"
            name="tratamiento"
            value={formik.values.tratamiento}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.tratamiento && Boolean(formik.errors.tratamiento)}
            helperText={formik.touched.tratamiento && formik.errors.tratamiento}
          />

          <TextField
            fullWidth
            label="medicamento"
            name="medicamento"
            value={formik.values.medicamento}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.medicamento && Boolean(formik.errors.medicamento)}
            helperText={formik.touched.medicamento && formik.errors.medicamento}
          />
          <TextField
            fullWidth
            label="Dias Tratamiento"
            name="diasTratamiento"
            value={formik.values.diasTratamiento}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.diasTratamiento && Boolean(formik.errors.diasTratamiento)}
            helperText={formik.touched.diasTratamiento && formik.errors.diasTratamiento}
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
                label="Responsable"
                error={formik.touched.responsable && Boolean(formik.errors.responsable)} // Muestra el error
                helperText={formik.touched.responsable && formik.errors.responsable} // Muestra el texto de ayuda del error
              />
            )}
          />

          <TextField
            fullWidth
            label="Veterinario"
            name="veterinario"
            value={formik.values.veterinario}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.veterinario && Boolean(formik.errors.veterinario)}
            helperText={formik.touched.veterinario && formik.errors.veterinario}
          />


          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Controlled picker"
                // value={value?.toString()}
                onChange={(newValue) => setValue(newValue)}
                sx={{ width: "100%" }}
              />
            </DemoContainer>
          </LocalizationProvider>

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


