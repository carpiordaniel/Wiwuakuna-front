import * as Yup from 'yup';



export const crearRegistroReproduccionValidationSchema = Yup.object({
  animal: Yup.string().required('El campo es obligatorio'),
  fecha: Yup.string().required('El campo es obligatorio'),
  tipo: Yup.string().required('El campo es obligatorio'),
  sexo: Yup.string().required('El campo es obligatorio'),
  encargado: Yup.string().required('El campo es obligatorio'),
  nota: Yup.string().required('El campo es obligatorio'),
  estado: Yup.string().required('El campo es obligatorio'),
});

