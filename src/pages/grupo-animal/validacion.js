import * as Yup from 'yup';



export const crearGrupoAnimalValidationSchema = Yup.object({
  codigo: Yup.string().required('El campo es obligatorio'),
  tipoAnimal: Yup.string().required('El campo es obligatorio'),
  instalacion: Yup.string().required('El campo es obligatorio'),
});

