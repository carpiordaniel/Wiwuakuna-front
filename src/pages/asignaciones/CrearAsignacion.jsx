import { ASIGNACIONES, COLORS, FINCAS, USUARIOS } from '@/globals/constantes';
import { Box, Button, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axiosClient from '../../axios/apiClient';
import { crearAsignacionValidationSchema } from './validacion'; // Importa el esquema
export const CrearAsignacion = ({ accion = "registrar", data, getAllAsignaciones }) => {

  const [fincas, setFincas] = useState([]);
  const [responsables, setResponsables] = useState([]);

  const formik = useFormik({
    initialValues: {
      id: data?.id || null,
      finca: data?.finca || '',
      responsable: data?.responsable || localStorage.getItem('USUARIO') || 'SIN RESPONSABLE',
    },
    validationSchema: crearAsignacionValidationSchema,
    onSubmit: async (values) => {
      let newValues = values
      if (accion == "registrar") {
        console.log("registrar")
        const { finca, responsable } = values;
        newValues = { finca, responsable }
      }
      try {
        const response = accion === "registrar"
          ? await axiosClient.post(`${ASIGNACIONES.POST_ASIGNACIONES}`, newValues)
          : await axiosClient.put(`${ASIGNACIONES.PUT_ASIGNACIONES}${data.id}`, values);

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
        getAllAsignaciones();
      }
    },
  });

  useEffect(() => {
    getAllFincas();
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
        {/* {JSON.stringify( formik.values )}
        {JSON.stringify( formik.errors )} */}
        <Typography variant="h5" mb={3} align="center">
          {accion === "editar" ? "Editar Asignaciones" : "Registrar Asignaciones"}
        </Typography>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1rem' }}>

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
          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('responsable', value?.value)}
            name="responsable"
            id='responsable'
            value={formik.values.responsable}
            onBlur={formik.handleBlur}
            error={formik.touched.responsable && Boolean(formik.errors.responsable)}
            disablePortal
            options={responsables}
            renderInput={(params) => (
              <TextField
                {...params}
                label="responsable"
                error={formik.touched.responsable && Boolean(formik.errors.responsable)} // Muestra el error
                helperText={formik.touched.responsable && formik.errors.responsable} // Muestra el texto de ayuda del error
              />
            )}
          />

          {/* 
          <TextField
            disabled={accion === "registrar" ? true : false}
            fullWidth
            label="Responsable"
            name="responsable"
            value={formik.values.responsable}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.responsable && Boolean( formik.errors.responsable )}
            helperText={formik.touched.responsable && formik.errors.responsable}
          /> */}

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


