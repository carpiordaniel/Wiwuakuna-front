import * as Yup from 'yup';



export const crearResponsableValidationSchema = Yup.object({
  tipo: Yup.string().required('El campo es obligatorio'),
  nombre: Yup.string().required('El campo es obligatorio'),
  apellido: Yup.string().required('El campo es obligatorio'),
  correo: Yup.string().required('El campo es obligatorio'),
  cedula: Yup.string().required('El campo es obligatorio'),
});

