import * as Yup from 'yup';



export const crearLoteValidationSchema = Yup.object({
  nombre: Yup.string().required('El campo es obligatorio'),
  tipoGanado: Yup.string().required('El campo es obligatorio'),
});

