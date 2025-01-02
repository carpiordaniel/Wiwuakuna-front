import * as Yup from 'yup';



export const crearInstalacionValidationSchema = Yup.object({
  finca: Yup.string().required('La finca es obligatoria'),
  articulo: Yup.string().required('El tipo es obligatorio'),
  fecha: Yup.string().required('La nombre es obligatoria'),
  valor: Yup.string().required('El responsable es obligatorio'),
});

