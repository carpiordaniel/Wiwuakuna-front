import * as Yup from 'yup';



export const crearUnidadValidationSchema = Yup.object({
  id: Yup.string().required('El tipo es obligatorio'),
  nombre: Yup.string().required('La nombre es obligatoria'),
});

