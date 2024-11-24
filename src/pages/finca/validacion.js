import * as Yup from 'yup';



export const crearFincaValidationSchema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  dimension: Yup.string().required('La dimensión es obligatoria'),
  pais: Yup.string().required('El país es obligatorio'),
  ciudad: Yup.string().required('La ciudad es obligatoria'),
  responsable: Yup.string().required('El responsable es obligatorio'),
});