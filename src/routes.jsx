// routes.jsx
import { Info, AccountCircle, Dashboard, House, Login, Logout } from "@mui/icons-material"; // Asegúrate de tener instalada la librería de Material Icons
import Home from "./pages/dashboard/home";
import Profile from "./pages/dashboard/profile";
import Tables from "./pages/dashboard/tables";
import GiteIcon from '@mui/icons-material/Gite';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import {Finca} from "./pages/finca/Finca";
import LogoutButton from "./components/LogoutButton";
import { Instalacion } from "./pages/instalacion/Instalacion";
import { RegistroProduccion } from "./pages/registro-produccion/RegistroProduccion";
import { RegistroVeterinario } from "./pages/registro-veterinario/RegistroVeterinario";
import { RegistroAnimal } from "./pages/animal/RegistroAnimal";

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
    label: "Registro Producción",
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
    icon: <DomainVerificationIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/logout",
    element: <LogoutButton />,
    label: "Cerrar Sesión",
    icon: <Logout /> // Ícono de la página "Profile"
  },
];

export default routes;
