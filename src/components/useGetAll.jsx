import axiosClient from '@/axios/apiClient';
import { USUARIOS } from '@/globals/constantes';
import React, { useState } from 'react'

export const useGetAll = () => {

  const [responsables, setResponsables] = useState([]);
  const getAllResponsables = async () => {
    try {
      const response = await axiosClient.get(`${USUARIOS.GET_ALL_USUARIOS}`);
      console.log(response.data);
      setResponsables(response.data.map(finca => ({ label: finca.username, value: finca.username })));
    } catch (error) {
      console.error('Error al obtener las fincas:', error);
    }
  }

  return { responsables, getAllResponsables }
}


