import * as Yup from 'yup';



export const crearRegistroAnimalValidationSchema = Yup.object({
  tipo: Yup.string().required('El campo es obligatorio'),
  sexo: Yup.string().required('El campo es obligatorio'),
  lote: Yup.string().required('El campo es obligatorio'),
  estado: Yup.string().required('El campo es obligatorio'),
  nombre: Yup.string().required('El campo es obligatorio'),
  grupo: Yup.string().required('El campo es obligatorio'),
  finca: Yup.string().required('El campo es obligatorio'),
});

