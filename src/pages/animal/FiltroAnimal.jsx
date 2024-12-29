import { useGetAll } from '@/components/useGetAll'
import { COLORS, LISTA_SEXO_ANIMAL } from '@/globals/constantes'
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'

export const FiltroAnimal = ({ open, setOnClose, setFilters }) => {

  const { dataFinca, getAllFinca,
    tipoAnimal, getTipoAnimal,
    dataGrupoAnimal, getAllGrupoAnimal
  } = useGetAll();

  useEffect(() => {
    getTipoAnimal();
    getAllGrupoAnimal();
    getAllFinca();
  }, []);

  const formik = useFormik({
    initialValues: {
      tipo: null,
      sexo: null,
      nombre: null,
      grupo: null,
      finca: null,
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
              onChange={(event, value) => formik.setFieldValue('tipo', value?.value)}
              name="tipo"
              id='tipo'
              onBlur={formik.handleBlur}
              error={formik.touched.tipo && Boolean(formik.errors.tipo)}
              value={tipoAnimal.find((tipo) => tipo.value === formik.values.tipo) || null}
              sablePortal
              options={tipoAnimal}
              getOptionLabel={(option) => option.label || ''}
              isOptionEqualToValue={(option, value) => option.value === value?.value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tipo Animal"
                  error={formik.touched.tipo && Boolean(formik.errors.tipo)}
                  helperText={formik.touched.tipo && formik.errors.tipo}
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
                  label="grupo"
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


