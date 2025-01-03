import { Routes, Route, Navigate, Router } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import Catalogos from "./pages/catalogos/Catalogos";
import SidebarLayout from "./SidebarLayout";
import { routes } from "./routes";
import SignIn from "./pages/auth/sign-in";


function App() {

  const isAuthenticated = localStorage.getItem('isAuthenticated');


  return (

    // <Routes>
    // {/* Ruta principal con layout */}

    // <Route path="/" element={<SidebarLayout routes={routes} />}>

    //   {routes.map((route) => (
    //     <Route key={route.path} path={route.path} element={route.element} />
    //   ))}


    // </Route>
    // </Routes>

    <Routes>
      <Route path="/login" element={<SignIn />} />

      <Route
        path="/"
        element={isAuthenticated ? <SidebarLayout routes={routes} /> : <Navigate to="/login" />}
      >
        {routes.map( ( route ) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ) )}
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>


  );
}

export default App;
