import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { COLORS, DICCIONARIOS, FINCAS, INSTALACIONES, USUARIOS } from '../../globals/constantes';
import { crearInstalacionValidationSchema } from './validacion'; // Importa el esquema
import axios from 'axios';
import Swal from 'sweetalert2';
import axiosClient from '@/axios/apiClient';
import { json } from 'react-router-dom';

export const CrearInstalacion = ({ accion = "registrar", data, getAllInstalaciones }) => {
  console.log(data)
  const [fincas, setFincas] = useState([]);
  const [tipoInstalacion, setTipoInstalacion] = useState([]);
  const [listaResponsables, setListaResponsables] = useState([]);

  const formik = useFormik({
    initialValues: {
      id: data?.id || '',
      tipo: data?.tipo?.toString() || '',
      finca: data?.finca || '',
      nombre: data?.nombre || '',
      responsable: data?.responsable || '',
    },
    validationSchema: crearInstalacionValidationSchema,
    onSubmit: async (values) => {
      console.log(values)
      let newValues = values
      if (accion == "registrar") {
        console.log("registrar")
        const { tipo, finca, nombre, responsable } = values;
        newValues = { tipo, finca, nombre, responsable }
      }
      try {
        const response = accion === "registrar"
          ? await axiosClient.post(`${INSTALACIONES.POST}`, newValues)
          : await axiosClient.put(`${INSTALACIONES.PUT}/${values.id}`, values);

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
        getAllInstalaciones();
      }

    },
  });



  useEffect(() => {
    getAllFincas();
    getAllTipoInstalacion();
    getAllResponsables();

  }, []);

  const getAllFincas = async () => {
    try {
      const response = await axiosClient.get(`${FINCAS.GET_FINCA}`);

      console.log(response.data);
      setFincas(response.data.map(finca => ({ label: finca.nombre, value: finca.id })));
    } catch (error) {
      console.error('Error al obtener las fincas:', error);
    }
  }

  const getAllTipoInstalacion = async () => {
    try {
      const response = await axiosClient.get(DICCIONARIOS.GET_BY_TABLA("tipo_instalacion"));
      console.log(response.data);
      setTipoInstalacion(response.data.map(tipoInstal => ({ label: tipoInstal.nombre, value: tipoInstal.id_tabla })));
    } catch (error) {
      console.error('Error al obtener las fincas:', error);
    }
  }



  const getAllResponsables = async () => {
    try {
      const response = await axiosClient.get(`${USUARIOS.GET_ALL_USUARIOS}`);
      console.log(response.data);
      setListaResponsables(response.data.map(finca => ({ label: finca.username, value: finca.username })));
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
        <Typography variant="h5" mb={3} align="center">
          {accion === "editar" ? "Editar Instalación" : "Registrar Instalación"}
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>
          {/* {JSON.stringify(formik.values)}
          {JSON.stringify(formik.errors)} */}
          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('tipo', value?.value)}
            name="tipo"
            id='tipo'
            onBlur={formik.handleBlur}
            error={formik.touched.tipo && Boolean(formik.errors.tipo)}
            value={tipoInstalacion.find((tipo) => tipo.value === formik.values.tipo) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={tipoInstalacion}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la tipo)
            isOptionEqualToValue={(option, value) => option.value === value?.value} // Compara opciones correctamente
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo"
                error={formik.touched.tipo && Boolean(formik.errors.tipo)} // Muestra el error
                helperText={formik.touched.tipo && formik.errors.tipo} // Muestra el texto de ayuda del error
              />
            )}
          />

          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('finca', value?.value)}
            name="finca"
            id='finca'
            onBlur={formik.handleBlur}
            error={formik.touched.finca && Boolean(formik.errors.finca)}
            value={fincas.find((finca) => finca.value === formik.values.finca) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={fincas}
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

          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('responsable', value?.value)}
            name="responsable"
            id='responsable'
            onBlur={formik.handleBlur}
            error={formik.touched.responsable && Boolean(formik.errors.responsable)}
            value={listaResponsables.find((responsable) => responsable.value === formik.values.responsable) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={listaResponsables}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la responsable)
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


