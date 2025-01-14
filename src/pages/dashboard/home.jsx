import axiosClient from "@/axios/apiClient";
import {
  ordersOverviewData,
  projectsTableData,
  statisticsCardsData,
  statisticsChartsData,
} from "@/data";
import { MOVIMIENTOS } from "@/globals/constantes";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  ArrowUpIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Progress,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { Camera, PieChart } from "@mui/icons-material";
import { CardContent } from "@mui/material";
import { Box, padding } from "@mui/system";
import { BarChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Bar, Pie } from "react-chartjs-2";
import { CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Legend } from "chart.js";

export function Home() {



  const [dataMovimientos, setDataMovimientos] = useState([]);

  useEffect(() => {
    getAllMovimientos();
  }, []);

  const getAllMovimientos = async (params) => {
    try {
      const response = await axiosClient.get(MOVIMIENTOS.GET_ALL, { params: params });
      console.log(response.data);
      setDataMovimientos(response.data);
    } catch (error) {
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataMovimientos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
    XLSX.writeFile(workbook, "KARDEX.xlsx");
  };


  const totalPorFinca = dataMovimientos.reduce((acc, item) => {
    const { finca, valor } = item;
    // Si la finca no existe en el acumulador, inicializarla
    if (!acc[finca]) {
      acc[finca] = 0;
    }
    // Sumar el valor al total de la finca
    acc[finca] += valor;
    return acc;
  }, {});

  const resultadoPorFinca = Object.entries(totalPorFinca).map(([finca, total]) => ({
    finca: parseInt(finca, 10),
    total
  }));



  const totalPorInstalaciones = dataMovimientos.reduce((acc, item) => {
    const { instalacion, valor } = item;
    if (!acc[instalacion]) {
      acc[instalacion] = 0;
    }
    acc[instalacion] += valor;
    return acc;
  }, {});

  const resultadoPorInstalaciones = Object.entries(totalPorInstalaciones).map(([instalacion, total]) => ({
    instalacion: parseInt(instalacion, 10),
    total
  }));


  const totalPorTipo = dataMovimientos.reduce((acc, item) => {
    const { tipo, valor } = item;
    if (!acc[tipo]) {
      acc[tipo] = 0;
    }
    acc[tipo] += valor;
    return acc;
  }, {});

  const resultadoPorTipo = Object.entries(totalPorTipo).map(([tipo, total]) => ({
    tipo: parseInt(tipo, 10),
    total
  }));


  const totalPorArticulo = dataMovimientos.reduce((acc, item) => {
    const { responsable, valor } = item;
    if (!acc[responsable]) {
      acc[responsable] = 0;
    }
    acc[responsable] += valor;
    return acc;
  }, {});

  const resultadoPorArticulo = Object.entries(totalPorArticulo).map(([responsable, total]) => ({
    responsable,
    total,
  }));


  const totalPorFincaYTipo = dataMovimientos.reduce((acc, item) => {
    const { finca, tipo, valor } = item;
    if (!acc[finca]) {
      acc[finca] = {};
    }
    if (!acc[finca][tipo]) {
      acc[finca][tipo] = 0;
    }
    acc[finca][tipo] += valor;
    return acc;
  }, {});

  // Convertir el resultado en un array más legible
  const resultadoPorFincaYTipo = Object.entries(totalPorFincaYTipo).map(([finca, tipos]) => ({
    finca: parseInt(finca, 10),
    tipos: Object.entries(tipos).map(([tipo, total]) => ({
      tipo: parseInt(tipo, 10),
      total,
    })),
  }));



  const totalPorInstalacionesYTipo = dataMovimientos.reduce((acc, item) => {
    const { instalacion, tipo, valor } = item;
    if (!acc[instalacion]) {
      acc[instalacion] = {};
    }
    if (!acc[instalacion][tipo]) {
      acc[instalacion][tipo] = 0;
    }
    acc[instalacion][tipo] += valor;
    return acc;
  }, {});

  const resultadoPorInstalacionesYTipo = Object.entries(totalPorInstalacionesYTipo).map(([instalacion, tipos]) => ({
    instalacion: parseInt(instalacion, 10),
    tipos: Object.entries(tipos).map(([tipo, total]) => ({
      tipo: parseInt(tipo, 10),
      total,
    })),
  }));




  return (
    <div className="mt-12" style={{ display: 'flex', gap: 20, flexDirection: 'column' }}>
      {/* {JSON.stringify(resultadoPorInstalaciones)} */}
      <Button color="blue" onClick={() => { exportToExcel(); }}>
        Exportar Kardex(Excel)
      </Button>


      <hr />
      <Card style={{ padding: 10 }}>


        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {resultadoPorFincaYTipo.map((item) => (
            <Card sx={{ width: 10, borderRadius: 2 }} key={item.finca}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      borderRadius: 1,
                      padding: 1
                    }}>
                      <AgricultureIcon size={16} color="#000000" />
                    </Box>
                    <p>
                      Finca: {item.finca}
                    </p>
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between'
                  }}>
                    {/* <Typography variant="h5" component="div" fontWeight="bold">
                    ${item.total.toFixed(2)}
                  </Typography> */}

                    {item.tipos.map((tipo) => (
                      <Box
                        key={tipo.tipo}
                        sx={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}
                      >
                        <Typography variant="body1">Tipo {tipo.tipo}</Typography>
                        <Typography variant="body1" fontWeight="bold">
                          ${tipo.total.toFixed(2)}
                        </Typography>
                      </Box>
                    ))}


                  </Box>
                </Box>
              </CardContent>
            </Card>

          ))}
        </Box>
      </Card>
      <Card style={{ padding: 10 }}>


        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {resultadoPorInstalacionesYTipo.map((item) => (
            <Card sx={{ width: 300, borderRadius: 2 }} key={item.instalacion}>
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        backgroundColor: "rgba(25, 118, 210, 0.1)",
                        borderRadius: 1,
                        padding: 1,
                      }}
                    >
                      <AgricultureIcon size={16} color="#000000" />
                    </Box>
                    <p>Instalación: {item.instalacion}</p>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    {item.tipos.map((tipo) => (
                      <Box
                        key={tipo.tipo}
                        sx={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}
                      >
                        <Typography variant="body1">Tipo {tipo.tipo}</Typography>
                        <Typography variant="body1" fontWeight="bold">
                          ${tipo.total.toFixed(2)}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Card>

      <Card style={{ padding: 10 }}>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {resultadoPorTipo.map((item) => (
            <Card sx={{ width: 10, borderRadius: 2 }} key={item.tipo}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      borderRadius: 1,
                      padding: 1
                    }}>
                      <AgricultureIcon size={16} color="#000000" />
                    </Box>
                    <p>
                      Tipo: {item.tipo}
                    </p>
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between'
                  }}>
                    <Typography variant="h5" component="div" fontWeight="bold">
                      ${item.total.toFixed(2)}
                    </Typography>

                  </Box>
                </Box>
              </CardContent>
            </Card>

          ))}

        </Box>
      </Card>


      <Card style={{ padding: 10 }}>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {resultadoPorArticulo.map((item) => (
            <Card sx={{ width: 10, borderRadius: 2 }} key={item.responsable}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      borderRadius: 1,
                      padding: 1
                    }}>
                      <AgricultureIcon size={16} color="#000000" />
                    </Box>
                    <p>
                      Articulo: {item.responsable}
                    </p>
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between'
                  }}>
                    <Typography variant="h5" component="div" fontWeight="bold">
                      ${item.total.toFixed(2)}
                    </Typography>

                  </Box>
                </Box>
              </CardContent>
            </Card>

          ))}

        </Box>
      </Card>
    </div >
  );
}

export default Home;
