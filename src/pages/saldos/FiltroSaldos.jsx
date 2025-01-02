import { useGetAll } from '@/components/useGetAll'
import { COLORS } from '@/globals/constantes'
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'

export const FiltroSaldos = ({ open, setOnClose, setFilters }) => {

  const { responsables, getAllResponsables, dataFinca, getAllFinca,
    tipoInstalacion, getAllTipoInstalacion,
    dataInstalacion, getAllInstalaciones, dataArticulos, getAllArticulos,

  } = useGetAll();

  useEffect(() => {
    getAllFinca();
    getAllInstalaciones();
    getAllArticulos();
  }, []);

  const formik = useFormik({
    initialValues: {
      finca: null,
      nombre: null,
      instalacion: null,
      articulo: null,
      valor: null,

    },
    onSubmit: async (values) => {
      const params = Object.fromEntries(
        Object.entries(values).filter(([key, value]) => value !== null && value !== '')
      );

      setFilters(params);
    },
  });

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={() => setOnClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          display: 'flex',
          justifyContent: 'right',
          height: '100vh',
          padding: 0,
          margin: 0
        }}
      >
        {/* {JSON.stringify(formik.values)} */}
        <DialogContent sx={{
          padding: 2, height: '100vh', width: '500px'
        }}>
          <DialogTitle id="alert-dialog-title">Filtrar</DialogTitle>
          <Box sx={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>

            <Autocomplete
              onChange={(event, value) => formik.setFieldValue('finca', value?.value)}
              name="finca"
              id='finca'
              onBlur={formik.handleBlur}
              error={formik.touched.finca && Boolean(formik.errors.finca)}
              value={dataFinca.find((tipo) => tipo.value === formik.values.finca) || null}
              sablePortal
              options={dataFinca}
              getOptionLabel={(option) => option.label || ''}
              isOptionEqualToValue={(option, value) => option.value === value?.value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Finca"
                  error={formik.touched.finca && Boolean(formik.errors.finca)}
                  helperText={formik.touched.finca && formik.errors.finca}
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


          </Box>
          <Button variant="contained" sx={{
            margin: "10px", cursor: 'pointer', borderRadius: '10px', color: 'white',
            backgroundColor: COLORS.PRIMARY
          }} onClick={formik.handleSubmit}>Buscar</Button>
        </DialogContent>
      </Dialog>
    </>
  )
}


