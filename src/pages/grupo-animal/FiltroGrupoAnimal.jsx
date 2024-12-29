import { useGetAll } from '@/components/useGetAll'
import { COLORS } from '@/globals/constantes'
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'

export const FiltroGrupoAnimal = ({ open, setOnClose, setFilters }) => {

  const { tipoAnimal, getTipoAnimal,
    dataInstalacion, getAllInstalaciones } = useGetAll();

  useEffect(() => {
    getTipoAnimal();
    getAllInstalaciones();
  }, []);

  const formik = useFormik({
    initialValues: {
      codigo: null,
      tipo_animal: null,
      instalacion: null,
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

            <TextField
              fullWidth
              label="Codigo"
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
              value={tipoAnimal.find((tipo) => tipo.value === formik.values.tipo_animal) || null}
              sablePortal
              options={tipoAnimal}
              getOptionLabel={(option) => option.label || ''}
              isOptionEqualToValue={(option, value) => option.value === value?.value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tipo Animal"
                  error={formik.touched.tipo_animal && Boolean(formik.errors.tipo_animal)}
                  helperText={formik.touched.tipo_animal && formik.errors.tipo_animal}
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
                  label="Instalacion"
                  error={formik.touched.instalacion && Boolean(formik.errors.instalacion)}
                  helperText={formik.touched.instalacion && formik.errors.instalacion}
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


