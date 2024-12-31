import axiosClient from '@/axios/apiClient';
import { ANIMALES, DICCIONARIOS, FINCAS, GRUPO_ANIMAL, INSTALACIONES, USUARIOS } from '@/globals/constantes';
import React, { useState } from 'react'

export const useGetAll = () => {

  const [responsables, setResponsables] = useState([]);
  const [dataFinca, setDataFinca] = useState([]);
  const [tipoInstalacion, setTipoInstalacion] = useState([]);
  const [tipoAnimal, setTipoAnimal] = useState([]);
  const [dataInstalacion, setDataInstalacion] = useState([]);
  const [dataGrupoAnimal, setDataGrupoAnimal] = useState([]);
  const [animales, setAnimales] = useState([]);
  const [tipoReproduccion, setTipoReproduccion] = useState([]);


  const getAllResponsables = async () => {
    try {
      const response = await axiosClient.get(`${USUARIOS.GET_ALL_USUARIOS}`);
      setResponsables(response.data.map(finca => ({ label: finca.username, value: finca.username })));
    } catch (error) {
      console.error('Error al obtener las fincas:', error);
    }
  }

  const getAllFinca = async (params) => {
    try {
      const response = await axiosClient.get(FINCAS.GET_FINCA, { params: params });
      setDataFinca(response.data.map(item => ({ label: item.nombre, value: item.id })));
    } catch (error) {
      console.error(error);
    }
  };
  const getAllTipoInstalacion = async () => {
    try {
      const response = await axiosClient.get(DICCIONARIOS.GET_BY_TABLA("tipo_instalacion"));
      setTipoInstalacion(response.data.map(tipoInstal => ({ label: tipoInstal.nombre, value: tipoInstal.id_tabla })));
    } catch (error) {
      console.error('Error al obtener las fincas:', error);
    }
  }

  const getTipoAnimal = async () => {
    try {
      const response = await axiosClient.get(DICCIONARIOS.GET_BY_TABLA("tipo_animal"));
      setTipoAnimal(response.data.map(tipoAnimal => ({ label: tipoAnimal.nombre, value: tipoAnimal.id_tabla })));
    } catch (error) {
      console.error('Error al obtener las fincas:', error);
    }
  }

  const getAllInstalaciones = async (params) => {
    try {
      const response = await axiosClient.get(INSTALACIONES.GET_ALL, { params: params });
      console.log(response)
      setDataInstalacion(response.data.map(item => ({ label: item.nombre, value: item.id })));

    } catch (error) {
    }
  };

  const getAllGrupoAnimal = async (params) => {
    try {
      const response = await axiosClient.get(GRUPO_ANIMAL.GET_ALL, { params: params });
      console.log(response)
      setDataGrupoAnimal(response.data.map(item => ({ label: item.codigo, value: item.id })));
    } catch (error) {
      console.error(error);
    }
  };

  const getAllAnimales = async (params) => {
    try {
      const response = await axiosClient.get(ANIMALES.GET_BY_FILTER, { params: params });
      setAnimales(response.data.map(item => ({ label: item.nombre, value: item.id })));
    } catch (error) {
      console.error('Error al cargar animales:', error);
    }
  };

  const getAllTipoReproduccion = async () => {
    try {
      const response = await axiosClient.get(DICCIONARIOS.GET_BY_TABLA("tipo_produccion"));
      setTipoReproduccion(response.data.map(tipoAnimal => ({ label: tipoAnimal.nombre, value: tipoAnimal.id_tabla })));
    } catch (error) {
      console.error('Error al obtener las fincas:', error);
    }
  }




  return {
    responsables, getAllResponsables,
    dataFinca, getAllFinca,
    tipoInstalacion, getAllTipoInstalacion,
    tipoAnimal, getTipoAnimal,
    dataInstalacion, getAllInstalaciones,
    dataGrupoAnimal, getAllGrupoAnimal,
    animales, getAllAnimales,
    tipoReproduccion, getAllTipoReproduccion
  }
}


