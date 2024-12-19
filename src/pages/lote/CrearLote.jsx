import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Autocomplete } from '@mui/material';
import { useFormik } from 'formik';
import { COLORS, FINCAS, DICCIONARIOS } from '../../globals/constantes';
import { crearLoteValidationSchema } from './validacion'; // Importa el esquema
import axiosClient from '../../axios/apiClient';
import Swal from 'sweetalert2';

export const CrearLote = ({ accion = "registrar", data, fincaId }) => {
  const [tiposGanado, setTiposGanado] = useState([]);

  useEffect(() => {
    cargarTiposGanado();
  }, []);

  const cargarTiposGanado = async () => {
    try {
      const response = await axiosClient.get(DICCIONARIOS.GET_BY_TABLA("TIPO_GANADO"));
      setTiposGanado(response.data.map((tipo) => tipo.descripcion));
    } catch (error) {
      console.error("Error al cargar tipos de ganado:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      nombre: data?.nombre || '',
      tipoGanado: data?.tipo_ganado || '',
    },
    validationSchema: crearLoteValidationSchema,
    onSubmit: async (values) => {
      try {
        const payload = {
          nombre: values.nombre,
          tipo_ganado: tiposGanado.findIndex((tipo) => tipo === values.tipoGanado) + 1,
          finca: fincaId,
        };

        const response = accion === "editar"
          ? await axiosClient.put(`${FINCAS.PUT_FINCA}${data.id}`, payload)
          : await axiosClient.post(FINCAS.POST_FINCA, payload);

        Swal.fire({
          icon: response.status === 200 || response.status === 201 ? 'success' : 'error',
          title: response.status === 200 || response.status === 201
            ? 'Lote guardado correctamente'
            : 'Error al guardar el lote',
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
            disablePortal
            options={tiposGanado}
            value={formik.values.tipoGanado}
            onChange={(event, newValue) => formik.setFieldValue('tipoGanado', newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tipo de Ganado"
                name="tipoGanado"
                error={formik.touched.tipoGanado && Boolean(formik.errors.tipoGanado)}
                helperText={formik.touched.tipoGanado && formik.errors.tipoGanado}
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
