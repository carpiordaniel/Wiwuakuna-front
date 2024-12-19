import * as Yup from 'yup';



export const crearAsignacionValidationSchema = Yup.object({
  finca: Yup.string().required('El campo es obligatorio'),
  responsable: Yup.string().required('El campo es obligatorio'),
});

