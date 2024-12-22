import * as Yup from 'yup';



export const crearRegistroVeterinarioValidationSchema = Yup.object({
  animal: Yup.string().required('El campo es obligatorio'),
  tipo: Yup.string().required('El campo es obligatorio'),
  enfermedad: Yup.string().required('El campo es obligatorio'),
  diagnostico: Yup.string().required('El campo es obligatorio'),
  tratamiento: Yup.string().required('El campo es obligatorio'),
  medicamento: Yup.string().required('El campo es obligatorio'),
  dias: Yup.string().required('El campo es obligatorio'),
  estado: Yup.string().required('El campo es obligatorio'),
  responsable: Yup.string().required('El campo es obligatorio'),
  veterinario: Yup.string().required('El campo es obligatorio'),
  fecha: Yup.string().required('El campo es obligatorio'),
});

