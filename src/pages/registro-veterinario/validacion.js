import * as Yup from 'yup';



export const crearRegistroVeterinarioValidationSchema = Yup.object({
  animal: Yup.string().required('El campo es obligatorio'),
  tipo: Yup.string().required('El campo es obligatorio'),
  enfermedad: Yup.string().required('El campo es obligatorio'),
  diagnostico: Yup.string().required('El campo es obligatorio'),
  tratamiento: Yup.string().required('El campo es obligatorio'),
  medicamento: Yup.string().required('El campo es obligatorio'),
  diasTratamiento: Yup.string().required('El campo es obligatorio'),
  notas: Yup.string().required('El campo es obligatorio'),
  estado: Yup.string().required('El campo es obligatorio'),
});

