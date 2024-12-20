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
  GET_BY_FILTER: (responsable, finca) =>
    `${URL_BASE}/api/instalaciones/filtro?responsable=${responsable}${
      finca ? `&finca=${finca}` : ""
    }`,
  
};

export const ANIMALES = {
  GET_ALL: `${URL_BASE}/api/animales`,
  GET_BY_FILTER: (finca, grupo, instalacion) => {
    let query = `${URL_BASE}/api/animales?finca=${finca}`;
    if (grupo) query += `&grupo=${grupo}`;
    if (instalacion) query += `&instalacion=${instalacion}`;
    return query;
  },
  POST: `${URL_BASE}/api/animales`,
  PUT: (id) => `${URL_BASE}/api/animales/${id}`,
  DELETE: (id) => `${URL_BASE}/api/animales/${id}`,
};
export const LOTES = {
  GET_ALL: `${URL_BASE}/api/lotes`,
  GET_BY_ID: (id) => `${URL_BASE}/api/lotes/${id}`,
  POST: `${URL_BASE}/api/lotes`,
  PUT: (id) => `${URL_BASE}/api/lotes/${id}`,
  DELETE: (id) => `${URL_BASE}/api/lotes/${id}`,
  GET_BY_FINCA: (fincaId) => `${URL_BASE}/api/lotes/finca/${fincaId}`,
};