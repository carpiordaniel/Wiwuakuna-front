export const COLORS = {
  PRIMARY: "#333333",
};

// export const URL_BASE = "http://localhost:8080";
export const URL_BASE = "https://wiwuakuna.up.railway.app";

export const FINCAS = {
  GET_FINCA: `${URL_BASE}/api/fincas`,
  GET_FINCA_ID: `${URL_BASE}/finca/`,
  POST_FINCA: `${URL_BASE}/api/fincas`,
  PUT_FINCA: `${URL_BASE}/api/fincas/`,
  DELETE_FINCA: `${URL_BASE}/api/fincas`,
  GET_BY_RESPONSABLE: (responsable) => `${URL_BASE}/api/asignaciones/fincas?responsable=${responsable}`, // Actualización aquí
};

export const LOGIN = {
  POST_LOGIN: `${URL_BASE}/auth/login`,
};

export const DICCIONARIOS = {
  GET_ALL: `${URL_BASE}/api/diccionarios`,
  GET_BY_TABLA: (tabla) => `${URL_BASE}/api/diccionarios/${tabla}`,
};

export const ASIGNACIONES = {
  GET_ALL_ASIGNACIONES: `${URL_BASE}/api/asignaciones`,
  POST_ASIGNACIONES: `${URL_BASE}/api/asignaciones`,
  PUT_ASIGNACIONES: `${URL_BASE}/api/asignaciones/`,
  DELETE_ASIGNACIONES: `${URL_BASE}/api/asignaciones`,
};

export const USUARIOS = {
  GET_ALL_USUARIOS: `${URL_BASE}/api/usuarios`,
};


export const INSTALACIONES = {
  GET_ALL: `${URL_BASE}/api/instalaciones`,
  GET_BY_ID: `${URL_BASE}/api/instalaciones`,
  POST: `${URL_BASE}/api/instalaciones`,
  PUT: `${URL_BASE}/api/instalaciones`,
  DELETE: `${URL_BASE}/api/instalaciones`,
  GET_BY_FILTER: `${URL_BASE}/api/instalaciones`

};

export const ANIMALES = {
  GET_ALL: `${URL_BASE}/api/animales`,
  GET_BY_FILTER: `${URL_BASE}/api/animales`,
  POST: `${URL_BASE}/api/animales`,
  PUT: `${URL_BASE}/api/animales`,
  DELETE: `${URL_BASE}/api/animales`,
};
export const LOTES = {
  GET_ALL: `${URL_BASE}/api/lotes`,
  GET_BY_ID: (id) => `${URL_BASE}/api/lotes/${id}`,
  POST: `${URL_BASE}/api/lotes`,
  PUT: `${URL_BASE}/api/lotes`,
  DELETE: `${URL_BASE}/api/lotes`,
  GET_BY_FINCA: (fincaId) => `${URL_BASE}/api/lotes/finca/${fincaId}`,
};

export const GRUPO_ANIMAL = {
  GET_ALL: `${URL_BASE}/api/grupos`,
  POST: `${URL_BASE}/api/grupos`,
  PUT: `${URL_BASE}/api/grupos/`,
  DELETE: `${URL_BASE}/api/grupos`,
};

export const VETERINARIO = {
  GET_ALL: `${URL_BASE}/api/registros/veterinario`,
  GET_BY_FILTER: `${URL_BASE}/api/registros/veterinario`,
  POST: `${URL_BASE}/api/registros/veterinario`,
  PUT: `${URL_BASE}/api/registros/veterinario`,
  DELETE: `${URL_BASE}/api/registros/veterinario`,
};


export const PRODUCCION = {
  GET_ALL: `${URL_BASE}/api/registros/produccion`,
  GET_BY_FILTER: `${URL_BASE}/api/registros/produccion`,
  POST: `${URL_BASE}/api/registros/produccion`,
  PUT: `${URL_BASE}/api/registros/produccion`,
  DELETE: `${URL_BASE}/api/registros/produccion`,
};

export const REPRODUCCION = {
  GET_ALL: `${URL_BASE}/api/registros/reproduccion`,
  GET_BY_FILTER: `${URL_BASE}/api/registros/reproduccion`,
  POST: `${URL_BASE}/api/registros/reproduccion`,
  PUT: `${URL_BASE}/api/registros/reproduccion`,
  DELETE: `${URL_BASE}/api/registros/reproduccion`,
};

export const LISTA_SEXO_ANIMAL = [
  { label: 'MACHO', value: 'MACHO' },
  { label: 'HEMBRA', value: 'HEMBRA' },
];

export const ESTADO_ANIMAL = [
  { label: 'ACTIVO', value: true },
  { label: 'DESACTIVO', value: false },
];



export const formatDateToYYYYMMDD = (date) => {
  if (!date) return null; // Si la fecha es null o undefined, retorna null

  const parsedDate = new Date(date); // Intenta convertir a objeto Date
  if (isNaN(parsedDate.getTime())) return null; // Verifica si la fecha es válida

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Agrega cero inicial al mes
  const day = String(parsedDate.getDate()).padStart(2, '0'); // Agrega cero inicial al día

  return `${year}-${month}-${day}`;
}
