import * as Yup from 'yup';



export const crearRegistroProduccionValidationSchema = Yup.object({
  animal: Yup.string().required('El campo es obligatorio'),
  tipo: Yup.string().required('El campo es obligatorio'),
  fecha: Yup.string().required('El campo es obligatorio'),
  cantidad: Yup.string().required('El campo es obligatorio'),
  nota: Yup.string().required('El campo es obligatorio'),
  responsable: Yup.string().required('El campo es obligatorio'),
});

