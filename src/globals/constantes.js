export const COLORS = {
  PRIMARY: "#333333",
};

// export const URL_BASE = "http://localhost:8080";
export const URL_BASE = "https://wiwuakuna.up.railway.app";

export const FINCAS= {
  GET_FINCA: `${URL_BASE}/api/fincas`,
  GET_FINCA_ID: `${URL_BASE}/finca/`,
  POST_FINCA: `${URL_BASE}/api/fincas`,
  PUT_FINCA: `${URL_BASE}/api/fincas/`,
  DELETE_FINCA: `${URL_BASE}/api/fincas`,
};


export const LOGIN = {
  POST_LOGIN: `${URL_BASE}/auth/login`,
};

export const DICCIONARIOS = {
  GET_ALL: `${URL_BASE}/api/diccionarios`,
  GET_BY_TABLA: (tabla) => `${URL_BASE}/api/diccionarios/${tabla}`,
};