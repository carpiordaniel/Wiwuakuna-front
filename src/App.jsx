import { Routes, Route, Navigate, Router } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import Catalogos from "./pages/catalogos/Catalogos";
import SidebarLayout from "./SidebarLayout";
import { routes } from "./routes";


function App() {
  return (
    // <Router>
    <Routes>
    {/* Ruta principal con layout */}
    <Route path="/" element={<SidebarLayout routes={routes} />}>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Route>
  </Routes>
    // </Router>
  );
}

export default App;
