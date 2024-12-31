import * as Yup from 'yup';



export const crearLoteValidationSchema = Yup.object({
  nombre: Yup.string().required('El campo es obligatorio'),
  tipo_ganado: Yup.string().required('El campo es obligatorio'),
  finca: Yup.string().required('El campo es obligatorio'),
});

