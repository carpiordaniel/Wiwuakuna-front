// routes.jsx
import { Info, AccountCircle, Dashboard, House, Login, Logout, Group } from "@mui/icons-material"; // Asegúrate de tener instalada la librería de Material Icons
import Home from "./pages/dashboard/home";
import Profile from "./pages/dashboard/profile";
import Tables from "./pages/dashboard/tables";
import GiteIcon from '@mui/icons-material/Gite';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import { Finca } from "./pages/finca/Finca";
import LogoutButton from "./components/LogoutButton";
import { Instalacion } from "./pages/instalacion/Instalacion";
import { RegistroProduccion } from "./pages/registro-produccion/RegistroProduccion";
import { RegistroVeterinario } from "./pages/registro-veterinario/RegistroVeterinario";
import { RegistroAnimal } from "./pages/animal/RegistroAnimal";
import { RegistroReproduccion } from "./pages/registro-reproduccion/RegistroReproduccion";
import { RegistroGrupoAnimal } from "./pages/grupo-animal/RegistroGrupoAnimal";
import { RegistroLote } from "./pages/lote/RegistroLote";
import { RegistroResponsable } from "./pages/responsable/RegistroResponsables";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import AnimationIcon from '@mui/icons-material/Animation';
import InventoryIcon from '@mui/icons-material/Inventory';
import MotionPhotosAutoIcon from '@mui/icons-material/MotionPhotosAuto';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { Asignaciones } from "./pages/asignaciones/Asignaciones";
import JoinInnerIcon from '@mui/icons-material/JoinInner';
import { Unidades } from "./pages/unidades/Unidades";
import BalanceIcon from '@mui/icons-material/Balance';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import GrainIcon from '@mui/icons-material/Grain';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import { Articulos } from "./pages/articulos/Articulos";
import { Costos } from "./pages/costos/Costos";
import { Movimientos } from "./pages/movimientos/Movimientos";
import { Saldos } from "./pages/saldos/Saldos";
import ReporteInventario, { PDFLink } from "./pages/reportes/ReporteInventario";
import AssessmentIcon from '@mui/icons-material/Assessment';
import { PDFResumenLink } from "./pages/reportes/ReporteResumenInventario";
import { PDFAnalisisLink } from "./pages/reportes/ReporteAnalisisInventario";
import { PDFReproduccionLink } from "./pages/reportes/PDFReproduccionLink";



export const routes = [

  {
    path: "/",
    element: <Home />,
    label: "Home",
    icon: <House /> // Ícono de la página de inicio
  },
  {
    path: "/finca",
    element: <Finca />,
    label: "Finca",
    icon: <GiteIcon /> // Ícono de la página "About"
  },
  {
    path: "/instalacion",
    element: <Instalacion />,
    label: "Instalación",
    icon: <BubbleChartIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/registro-produccion",
    element: <RegistroProduccion />,
    label: "Producción",
    icon: <AgricultureIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/registro-veterino",
    element: <RegistroVeterinario />,
    label: "Registro Veterinario",
    icon: <MoreTimeIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/animal",
    element: <RegistroAnimal />,
    label: "Animal",
    icon: <MotionPhotosAutoIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/reproduccion",
    element: <RegistroReproduccion />,
    label: "Reproducción",
    icon: <AnimationIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/grupo-animal",
    element: <RegistroGrupoAnimal />,
    label: "Grupo Animal",
    icon: <WorkspacesIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/lote",
    element: <RegistroLote />,
    label: "Lote",
    icon: <InventoryIcon /> // Ícono de la página "Profile"
  },
  // {
  //   path: "/responsable",
  //   element: <RegistroResponsable />,
  //   label: "Responsable",
  //   icon: <EngineeringIcon /> // Ícono de la página "Profile"
  // },
  {
    path: "/asignaciones",
    element: <Asignaciones />,
    label: "Asignaciones",
    icon: <JoinInnerIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/unidades",
    element: <Unidades />,
    label: "Unidades",
    icon: <BalanceIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/articulos",
    element: <Articulos />,
    label: "Articulos",
    icon: <GrainIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/cotos",
    element: <Costos />,
    label: "Costos",
    icon: <CurrencyExchangeIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/movimientos",
    element: <Movimientos />,
    label: "Movimientos",
    icon: <FindReplaceIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/saldos",
    element: <Saldos />,
    label: "Saldos",
    icon: <PriceCheckIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/reporte-inventario",
    element: <PDFLink />,
    label: "Reporte Inventario",
    icon: <AssessmentIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/reporte-resumen-inventario",
    element: <PDFResumenLink />,
    label: "Resumen Inventario",
    icon: <AssessmentIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/reporte-analisis-inventario",
    element: <PDFAnalisisLink />,
    label: "Analisis Inventario",
    icon: <AssessmentIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/reporte-analisis-reproduccion",
    element: <PDFReproduccionLink />,
    label: "Analisis Reproducción",
    icon: <AssessmentIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/logout",
    element: <LogoutButton />,
    label: "Cerrar Sesión",
    icon: <Logout /> // Ícono de la página "Profile"
  },
];
export default routes;
