// routes.jsx
import { Info, AccountCircle, Dashboard, House } from "@mui/icons-material"; // Asegúrate de tener instalada la librería de Material Icons
import Home from "./pages/dashboard/home";
import Profile from "./pages/dashboard/profile";
import Tables from "./pages/dashboard/tables";
import GiteIcon from '@mui/icons-material/Gite';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import Finca from "./pages/finca/Finca";

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
    path: "/animales",
    element: <Profile />,
    label: "Animales",
    icon: <BubbleChartIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/produccion",
    element: <Profile />,
    label: "Producción",
    icon: <AgricultureIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/reproduccion",
    element: <Profile />,
    label: "Reproducción",
    icon: <MoreTimeIcon /> // Ícono de la página "Profile"
  },
  {
    path: "/inventario",
    element: <Profile />,
    label: "Inventario",
    icon: <DomainVerificationIcon /> // Ícono de la página "Profile"
  },
];

export default routes;
