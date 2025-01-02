import * as Yup from 'yup';



export const crearMovimientoValidationSchema = Yup.object({
  finca: Yup.string().required('Campo obligatorio'),
  instalacion: Yup.string().required('Campo obligatorio'),
  tipo: Yup.string().required('Campo obligatorio'),
  fecha: Yup.string().required('Campo obligatorio'),
  articulo: Yup.string().required('Campo obligatorio'),
  cantidad: Yup.string().required('Campo obligatorio'),
  valor: Yup.string().required('Campo obligatorio'),
  responsable: Yup.string().required('Campo obligatorio'),
});

