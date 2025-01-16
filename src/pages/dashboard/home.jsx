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
import { CardContent, Chip } from "@mui/material";
import { Box, padding, Stack } from "@mui/system";
import { BarChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { Bar, Pie } from "react-chartjs-2";
import { CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Legend } from "chart.js";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PersonIcon from '@mui/icons-material/Person';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import FlagCircleIcon from '@mui/icons-material/FlagCircle';

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
    const { ntipo, valor } = item;
    if (!acc[ntipo]) {
      acc[ntipo] = 0;
    }
    acc[ntipo] += valor;
    return acc;
  }, {});

  const resultadoPorTipo = Object.entries(totalPorTipo).map(([ntipo, total]) => ({
    ntipo: ntipo,
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
    const { nfinca, tipo, valor } = item;
    if (!acc[nfinca]) {
      acc[nfinca] = {};
    }
    if (!acc[nfinca][tipo]) {
      acc[nfinca][tipo] = 0;
    }
    acc[nfinca][tipo] += valor;
    return acc;
  }, {});

  // Convertir el resultado en un array más legible
  const resultadoPorFincaYTipo = Object.entries(totalPorFincaYTipo).map(([nfinca, tipos]) => ({
    nfinca: nfinca,
    tipos: Object.entries(tipos).map(([tipo, total]) => ({
      tipo: parseInt(tipo, 10),
      total,
    })),
  }));



  const totalPorInstalacionesYTipo = dataMovimientos.reduce((acc, item) => {
    const { ninstalacion, tipo, valor } = item;
    if (!acc[ninstalacion]) {
      acc[ninstalacion] = {};
    }
    if (!acc[ninstalacion][tipo]) {
      acc[ninstalacion][tipo] = 0;
    }
    acc[ninstalacion][tipo] += valor;
    return acc;
  }, {});

  const resultadoPorInstalacionesYTipo = Object.entries(totalPorInstalacionesYTipo).map(([ninstalacion, tipos]) => ({
    ninstalacion: ninstalacion,
    tipos: Object.entries(tipos).map(([tipo, total]) => ({
      tipo: parseInt(tipo, 10),
      total,
    })),
  }));


  const totalPorArticulos = dataMovimientos.reduce((acc, item) => {
    const { articulo, narticulo, cantidad } = item;
    if (!acc[articulo]) {
      acc[articulo] = { nombre: narticulo, cantidad: 0 };
    }
    acc[articulo].cantidad += cantidad;
    return acc;
  }, {});

  // Convertir el resultado en un arreglo
  const resultadoPorArticulos = Object.entries(totalPorArticulos).map(([articulo, datos]) => ({
    articulo,
    nombre: datos.nombre,
    cantidad: datos.cantidad,
  }));

  // Determinar el más vendido y el menos vendido
  const masVendido = resultadoPorArticulos.reduce((max, item) => (item.cantidad > max.cantidad ? item : max), resultadoPorArticulos[0]);
  const menosVendido = resultadoPorArticulos.reduce((min, item) => (item.cantidad < min.cantidad ? item : min), resultadoPorArticulos[0]);




  return (
    <div className="mt-12" style={{ display: 'flex', gap: 20, flexDirection: 'column' }}>
      {/* {JSON.stringify(resultadoPorInstalaciones)} */}
      <Button color="blue" onClick={() => { exportToExcel(); }}>
        Exportar Kardex(Excel)
      </Button>


      <hr />
      <Stack direction="row" spacing={1}>
        <Chip label="Ingresos" color="success" size="small" />
        <Chip label="Egresos" color="warning" size="small" />
      </Stack>
      <Card style={{ padding: 10 }}>


        <Typography variant="h5" component="div" fontWeight="bold" style={{ color: '#2196f3' }}>
          Ingresos y egresos por finca
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {resultadoPorFincaYTipo.map((item) => (
            <Card sx={{ width: 10, borderRadius: 2 }} key={item.nfinca}>
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
                    <strong>
                      Finca:
                    </strong>{item.nfinca}
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    gap: 1
                  }}>
                    {/* <Typography variant="h5" component="div" fontWeight="bold">
                    ${item.total.toFixed(2)}
                  </Typography> */}

                    {item.tipos.map((tipo) => (
                      <Box
                        key={tipo.tipo}

                      >
                        {/* <Typography variant="body1">Tipo {tipo.tipo}</Typography> */}
                        {/* <Typography variant="body1" fontWeight="bold">
                          ${tipo.total.toFixed(2)}
                        </Typography> */}
                        <Chip
                          label={`$ ${tipo.total.toFixed(2)}`}
                          color={tipo.tipo === 1 ? "success" : "warning"}
                        />
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
        <Typography variant="h5" component="div" fontWeight="bold" style={{ color: '#2196f3' }}>
          Ingresos y egresos por instalación
        </Typography>

        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {resultadoPorInstalacionesYTipo.map((item) => (
            <Card sx={{ width: 300, borderRadius: 2 }} key={item.ninstalacion}>
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
                      <HomeWorkIcon size={16} color="#000000" />
                    </Box>
                    <strong>Instalación:</strong>{item.ninstalacion}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    {item.tipos.map((tipo) => (
                      <Box
                        key={tipo.tipo}
                      >
                        {/* <Typography variant="body1">Tipo {tipo.tipo}</Typography>
                        <Typography variant="body1" fontWeight="bold">
                          ${tipo.total.toFixed(2)}
                        </Typography> */}

                        <Chip
                          label={`$ ${tipo.total.toFixed(2)}`}
                          color={tipo.tipo === 1 ? "success" : "warning"}
                        />

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
          {resultadoPorTipo.map((item) => {

            return <Card sx={{ width: 10, borderRadius: 2 }} key={item.ntipo}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{
                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      borderRadius: 1,
                      padding: 1
                    }}>
                      <AlignVerticalBottomIcon size={16} color="#000000" />
                    </Box>
                    <strong>
                      Tipo:
                    </strong>{item.ntipo}
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


          }
          )}

          <Typography variant="h5" component="div" fontWeight="bold">
            Profit:
            ${
              resultadoPorTipo.filter((item) => item.ntipo === "Ingreso").reduce((acc, item) => acc + item.total, 0).toFixed(2)
              -
              resultadoPorTipo.filter((item) => item.ntipo === "Egreso").reduce((acc, item) => acc + item.total, 0).toFixed(2)
            }
          </Typography>
        </Box>
      </Card>


      <Card style={{ padding: 10 }}>
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          <Card sx={{ width: 10, borderRadius: 2 }} >
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    borderRadius: 1,
                    padding: 1
                  }}>
                    <FlagCircleIcon size={16} color="#000000" />
                  </Box>
                  <div>
                    <strong>Artículo Más vendido: </strong>
                    <p>{masVendido?.nombre}({masVendido?.articulo})</p>
                  </div>
                </Box>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between'
                }}>
                  <Chip label={`${masVendido?.cantidad} unidades`} color="success" />
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ width: 10, borderRadius: 2 }} >
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{
                    backgroundColor: 'rgba(25, 118, 210, 0.1)',
                    borderRadius: 1,
                    padding: 1
                  }}>
                    <FlagCircleIcon size={16} color="#000000" />
                  </Box>
                  <div>
                    <strong>Artículo Menos vendido: </strong>
                    <p>{menosVendido?.nombre}({menosVendido?.articulo})</p>
                  </div>
                </Box>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between'
                }}>
                  <Chip label={`${menosVendido?.cantidad} unidades`} color="success" />
                </Box>
              </Box>
            </CardContent>
          </Card>


        </Box>

      </Card>
    </div >
  );
}

export default Home;
