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
  GET_BY_RESPONSABLE: (responsable) => `${URL_BASE}/api/fincas?responsable=${responsable}`,
};

export const LOGIN = {
  POST_LOGIN: `${URL_BASE}/auth/login`,
};

export const DICCIONARIOS = {
  GET_ALL: `${URL_BASE}/api/diccionarios`,
  GET_BY_TABLA: (tabla) => `${URL_BASE}/api/diccionarios/${tabla}`,
};

export const INSTALACIONES = {
  GET_ALL: `${URL_BASE}/api/instalaciones`,
  GET_BY_ID: (id) => `${URL_BASE}/api/instalaciones/${id}`,
  POST: `${URL_BASE}/api/instalaciones`,
  PUT: (id) => `${URL_BASE}/api/instalaciones/${id}`,
  DELETE: (id) => `${URL_BASE}/api/instalaciones/${id}`,
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
