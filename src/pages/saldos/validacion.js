import * as Yup from 'yup';



export const crearInstalacionValidationSchema = Yup.object({
  tipo: Yup.string().required('El tipo es obligatorio'),
  finca: Yup.string().required('La finca es obligatoria'),
  nombre: Yup.string().required('La nombre es obligatoria'),
  responsable: Yup.string().required('El responsable es obligatorio'),
});

