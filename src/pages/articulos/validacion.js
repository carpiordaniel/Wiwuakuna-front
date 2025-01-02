import * as Yup from 'yup';



export const crearActiculoValidationSchema = Yup.object({
  codigo: Yup.string().required('El id es obligatorio'),
  descripcion: Yup.string().required('La descripcion es obligatoria'),
  unidad: Yup.string().required('La unidad es obligatoria'),
});

