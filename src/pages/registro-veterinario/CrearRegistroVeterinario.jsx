import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { ANIMALES, COLORS, DICCIONARIOS, ESTADO_ANIMAL, FINCAS, formatDateToYYYYMMDD, USUARIOS, VETERINARIO } from '../../globals/constantes';
import { crearRegistroVeterinarioValidationSchema } from './validacion'; // Importa el esquema
import axios from 'axios';
import Swal from 'sweetalert2';
import axiosClient from '@/axios/apiClient';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export const CrearRegistroVeterinario = ({ accion = "registrar", data, getAllVeterinarios }) => {

  const [animales, setAnimales] = useState([]);
  const [tipoAnimal, setTipoAnimal] = useState([]);
  const [estadoTratamiento, setEstadoTratamiento] = useState([]);
  const [responsables, setResponsables] = useState([]);

  console.log(data)
  const formik = useFormik({
    initialValues: {
      id: data?.id || '',
      animal: data?.animal || '',
      tipo: data?.tipo?.toString() || '',
      enfermedad: data?.enfermedad || '',
      diagnostico: data?.diagnostico || '',
      tratamiento: data?.tratamiento || '',
      medicamento: data?.medicamento || '',
      dias: data?.dias || '',
      estado: data?.estado?.toString() || '',
      responsable: data?.responsable || '',
      veterinario: data?.veterinario || null,
      fecha: data?.fecha || formatDateToYYYYMMDD(new Date()),
    },
    validationSchema: crearRegistroVeterinarioValidationSchema,
    onSubmit: async (values) => {
      let newValues = values
      if (accion == "registrar") {
        const { animal, tipo, enfermedad, diagnostico, tratamiento, medicamento, dias, estado, responsable, veterinario, fecha } = values;
        newValues = { animal, tipo, enfermedad, diagnostico, tratamiento, medicamento, dias, estado, responsable, veterinario, fecha: formatDateToYYYYMMDD(fecha) }
      }
      try {
        const response = accion === "registrar"
          ? await axiosClient.post(`${VETERINARIO.POST}`, {
            ...newValues,
            estado: true ? 1 : 0,
            tipo: Number(newValues.tipo),
            dias: Number(newValues.dias),
          })
          : await axiosClient.put(`${VETERINARIO.PUT}/${data.id}`, {
            ...values,
            estado: true ? 1 : 0,
            tipo: Number(values.tipo),
            dias: Number(values.dias),
          });

        Swal.fire({
          icon: response.status === 200 ? 'success' : 'error',
          title: response.status === 200 ? `${accion === "registrar" ? 'Creada correctamente' : 'Actualizada correctamente'}` : `${accion === "registrar" ? 'Error al crear' : 'Error al actualizar'}`,
          showConfirmButton: false,
          timer: 3000,
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
        getAllVeterinarios();
      }
    },
  });



  useEffect(() => {
    cargarAnimales();
    getTipoTratamiento();
    getAllResponsables();
    getEstadoTratamiento();
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

  const getTipoTratamiento = async () => {
    try {
      const response = await axiosClient.get(DICCIONARIOS.GET_BY_TABLA("tipo_tratamiento"));
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

  const getEstadoTratamiento = async () => {
    try {
      const response = await axiosClient.get(DICCIONARIOS.GET_BY_TABLA("estado_tratamiento"));
      console.log(response.data);
      setEstadoTratamiento(response.data.map(item => ({ label: item.nombre, value: item.id_tabla })));
    } catch (error) {
      console.error('Error al obtener las fincas:', error);
    }
  }




  return (
    <div>
      <Box
        component="form"

        sx={{ margin: '40px 10px', }}
      >
        {/* {JSON.stringify(formik.values)}
        {JSON.stringify(formik.errors)} */}
        <Typography variant="h5" mb={3} align="center">
          {accion === "editar" ? "Editar registro veterinario" : "Registro veterinario"}
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>

          <Autocomplete
            onChange={(event, value) => {
              formik.setFieldValue('animal', value?.value)
            }}
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
                label="Tipo tratamiento"
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
            label="Dias"
            name="dias"
            value={formik.values.dias}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dias && Boolean(formik.errors.dias)}
            helperText={formik.touched.dias && formik.errors.dias}
            type="number"
          />
          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('estado', value?.value)}
            name="estado"
            id='estado'
            onBlur={formik.handleBlur}
            error={formik.touched.estado && Boolean(formik.errors.estado)}
            value={estadoTratamiento.find((tipo) => tipo.value === formik.values.estado) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={estadoTratamiento}
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
            value={null}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.veterinario && Boolean(formik.errors.veterinario)}
            helperText={formik.touched.veterinario && formik.errors.veterinario}
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
        </div>

        <Button
          onClick={formik.handleSubmit}
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


