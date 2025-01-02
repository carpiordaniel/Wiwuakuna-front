import { useGetAll } from '@/components/useGetAll'
import { COLORS } from '@/globals/constantes'
import { Autocomplete, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import { useEffect } from 'react'

export const FiltroVeterinario = ({ open, setOnClose, setFilters }) => {

  const { responsables, getAllResponsables,
    animales, getAllAnimales,
    tipoAnimal, getTipoAnimal,
    estadoTratamiento, getEstadoTratamiento


  } = useGetAll();

  useEffect(() => {
    getAllAnimales();
    getAllResponsables();
    getEstadoTratamiento();
    getTipoAnimal();
  }, []);

  const formik = useFormik({
    initialValues: {
      animal: null,
      tipo: null,
      enfermedad: null,
      diagnostico: null,
      tratamiento: null,
      medicamento: null,
      dias: null,
      estado: null,
      veterinario: null,
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


