import axiosClient from '@/axios/apiClient';
import { useGetAll } from '@/components/useGetAll';
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { COLORS, formatDateToYYYYMMDD, MOVIMIENTOS } from '../../globals/constantes';
import { crearMovimientoValidationSchema } from './validacion'; // Importa el esquema

export const CrearMovimientos = ({ accion = "registrar", data, getAllMovimientos }) => {
  console.log(data)


  const { responsables, getAllResponsables, dataFinca, getAllFinca,
    dataTipoMovimiento, getTiposMovimiento, dataArticulos, getAllArticulos,
    dataInstalacion, getAllInstalaciones,
  } = useGetAll();

  useEffect(() => {
    getAllResponsables();
    getAllFinca();
    getTiposMovimiento();
    getAllArticulos();
    getAllInstalaciones();
  }, []);


  const formik = useFormik({
    initialValues: {
      id: data?.id || '',
      finca: data?.finca || '',
      instalacion: data?.instalacion || '',
      tipo: data?.tipo?.toString() || '',
      fecha: data?.fecha || formatDateToYYYYMMDD(new Date()),
      articulo: data?.articulo || '',
      cantidad: data?.cantidad || '',
      valor: data?.valor || '',
      responsable: data?.responsable || localStorage.getItem('USUARIO') || 'SIN RESPONSABLE',

    },
    validationSchema: crearMovimientoValidationSchema,
    onSubmit: async (values) => {
      console.log(values)
      let newValues = values
      if (accion == "registrar") {
        console.log("registrar")
        const { finca, instalacion, tipo, fecha, articulo, cantidad, valor, responsable } = values;
        newValues = { finca, instalacion, tipo, fecha, articulo, cantidad, valor, responsable }
      }
      try {
        const response = accion === "registrar"
          ? await axiosClient.post(`${MOVIMIENTOS.POST}`, {
            ...newValues,
            tipo: Number(newValues.tipo),
          })
          : await axiosClient.put(`${MOVIMIENTOS.PUT}/${values.id}`, {
            ...values,
            tipo: Number(values.tipo),
          });

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
        // formik.resetForm();
        getAllMovimientos();
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
          {accion === "editar" ? "Editar Movimiento" : "Registrar Movimiento"}
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
            onChange={(event, value) => formik.setFieldValue('instalacion', value?.value)}
            name="instalacion"
            id='instalacion'
            onBlur={formik.handleBlur}
            error={formik.touched.instalacion && Boolean(formik.errors.instalacion)}
            value={dataInstalacion.find((tipo) => tipo.value === formik.values.instalacion) || null}
            sablePortal
            options={dataInstalacion}
            getOptionLabel={(option) => option.label || ''}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            renderInput={(params) => (
              <TextField
                {...params}
                label="instalacion"
                error={formik.touched.instalacion && Boolean(formik.errors.instalacion)}
                helperText={formik.touched.instalacion && formik.errors.instalacion}
              />
            )}
          />
          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('tipo', value?.value)}
            name="tipo"
            id='tipo'
            onBlur={formik.handleBlur}
            error={formik.touched.tipo && Boolean(formik.errors.tipo)}
            value={dataTipoMovimiento.find((tipo) => tipo.value === formik.values.tipo) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={dataTipoMovimiento}
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
            onChange={(event, value) => formik.setFieldValue('articulo', value?.value)}
            name="articulo"
            id='articulo'
            onBlur={formik.handleBlur}
            error={formik.touched.articulo && Boolean(formik.errors.articulo)}
            value={dataArticulos.find((tipo) => tipo.value === formik.values.articulo) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={dataArticulos}
            getOptionLabel={(option) => option.label || ''} // Muestra el label (nombre de la tipo)
            isOptionEqualToValue={(option, value) => option.value === value?.value} // Compara opciones correctamente
            renderInput={(params) => (
              <TextField
                {...params}
                label="articulo"
                error={formik.touched.articulo && Boolean(formik.errors.articulo)} // Muestra el error
                helperText={formik.touched.articulo && formik.errors.articulo} // Muestra el texto de ayuda del error
              />
            )}
          />

          <TextField
            fullWidth
            label="Cantidad"
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
            label="Valor"
            name="valor"
            value={formik.values.valor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.valor && Boolean(formik.errors.valor)}
            helperText={formik.touched.valor && formik.errors.valor}
            type='number'
          />

          <Autocomplete
            onChange={(event, value) => formik.setFieldValue('responsable', value?.value)}
            name="responsable"
            id='responsable'
            onBlur={formik.handleBlur}
            error={formik.touched.responsable && Boolean(formik.errors.responsable)}
            value={responsables.find((responsable) => responsable.value === formik.values.responsable) || null} // Selecciona el objeto correspondiente
            sablePortal
            options={responsables}
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


