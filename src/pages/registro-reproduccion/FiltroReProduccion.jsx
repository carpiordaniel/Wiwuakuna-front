import { useGetAll } from '@/components/useGetAll'
import { COLORS } from '@/globals/constantes'
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'

export const FiltroReProduccion = ({ open, setOnClose, setFilters }) => {

  const { responsables, getAllResponsables, animales, getAllAnimales,
    tipoReProduccion, getAllTipoReProduccion, estadoReProduccion, getAllEstadoReProduccion
  } = useGetAll();

  useEffect(() => {
    getAllResponsables();
    getAllAnimales();
    getAllTipoReProduccion();
    getAllEstadoReProduccion();
  }, []);

  const formik = useFormik({
    initialValues: {
      animal: null,
      tipo: null,
      macho: null,
      estado: null,
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
              onChange={(event, value) => formik.setFieldValue('animal', value?.value)}
              name="animal"
              id='animal'
              onBlur={formik.handleBlur}
              error={formik.touched.animal && Boolean(formik.errors.animal)}
              value={animales.find((item) => item.value === formik.values.animal) || null}
              sablePortal
              options={animales}
              getOptionLabel={(option) => option.label || ''}
              isOptionEqualToValue={(option, value) => option.value === value?.value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Hembra"
                  error={formik.touched.animal && Boolean(formik.errors.animal)}
                  helperText={formik.touched.animal && formik.errors.animal}
                />
              )}
            />

            <Autocomplete
              onChange={(event, value) => formik.setFieldValue('tipo', value?.value)}
              name="tipo"
              id='tipo'
              onBlur={formik.handleBlur}
              error={formik.touched.tipo && Boolean(formik.errors.tipo)}
              value={tipoReProduccion.find((tipo) => tipo.value === formik.values.tipo) || null}
              sablePortal
              options={tipoReProduccion}
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
              onChange={(event, value) => formik.setFieldValue('macho', value?.value)}
              name="macho"
              id='macho'
              onBlur={formik.handleBlur}
              error={formik.touched.macho && Boolean(formik.errors.macho)}
              value={animales.find((item) => item.value === formik.values.macho) || null}
              sablePortal
              options={animales}
              getOptionLabel={(option) => option.label || ''}
              isOptionEqualToValue={(option, value) => option.value === value?.value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Macho"
                  error={formik.touched.macho && Boolean(formik.errors.macho)}
                  helperText={formik.touched.macho && formik.errors.macho}
                />
              )}
            />

            <Autocomplete
              onChange={(event, value) => formik.setFieldValue('estado', value?.value)}
              name="estado"
              id='estado'
              onBlur={formik.handleBlur}
              error={formik.touched.estado && Boolean(formik.errors.estado)}
              value={estadoReProduccion.find((tipo) => tipo.value === formik.values.estado) || null} // Selecciona el objeto correspondiente
              sablePortal
              options={estadoReProduccion}
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


