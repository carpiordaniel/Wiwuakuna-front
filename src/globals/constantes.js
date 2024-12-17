export const COLORS = {
  PRIMARY: "#333333",
};

// export const URL_BASE = "http://localhost:8081";
export const URL_BASE = "https://wiwuakuna.up.railway.app";

export const FINCAS= {
  GET_FINCA: `${URL_BASE}/api/animales-fincas/fincas`,
  GET_FINCA_ID: `${URL_BASE}/finca/`,
  POST_FINCA: `${URL_BASE}/finca`,
  PUT_FINCA: `${URL_BASE}/finca/`,
  DELETE_FINCA: `${URL_BASE}/api/animales-fincas/fincas`,
};


export const LOGIN = {
  POST_LOGIN: `${URL_BASE}/auth/login`,
};
