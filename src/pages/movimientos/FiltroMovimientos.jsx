import { useGetAll } from '@/components/useGetAll'
import { COLORS } from '@/globals/constantes'
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'

export const FiltroMovimientos = ({ open, setOnClose, setFilters }) => {

  const { responsables, getAllResponsables, dataFinca, getAllFinca,
    dataTipoMovimiento, getTiposMovimiento,
    dataArticulos, getAllArticulos,
  } = useGetAll();

  useEffect(() => {
    getAllResponsables();
    getAllFinca();
    getTiposMovimiento();
    getAllArticulos();
  }, []);

  const formik = useFormik({
    initialValues: {
      finca: null,
      instalacion: null,
      articulo: null,
      responsable: localStorage.getItem('USUARIO') || '',
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
            <Autocomplete
              onChange={(event, value) => formik.setFieldValue('tipo', value?.value)}
              name="tipo"
              id='tipo'
              onBlur={formik.handleBlur}
              error={formik.touched.tipo && Boolean(formik.errors.tipo)}
              value={dataTipoMovimiento.find((tipo) => tipo.value === formik.values.tipo) || null}
              sablePortal
              options={dataTipoMovimiento}
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


