import { Link } from "react-router-dom"; // Asegúrate de usar Link para la navegación
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

 
// SidebarLayout.js
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const SidebarLayout = ({ routes }) => {
  return (
    <div style={{ display: "flex", height: "100vh"}}>
    {/* Menú lateral */}
    <div style={{ backgroundColor: "#f5f5f5"  }}>
      <List>
        {routes.map((route) => (
          <ListItem
            button
            component={NavLink}
            to={route.path}
            key={route.path}
            style={({ isActive }) => ({
              backgroundColor: isActive && "#333333", // Cambia el color de fondo si está activo
              margin: "10px",
              color: isActive ? "white" : "black",
              borderRadius: "10px",
              width: "250px"
            })}
          >
            <ListItemIcon style={{ color: ({ isActive }) => (isActive ? "red" : "#000000") }}>
              {route.icon} {/* Aquí va el ícono */}
            </ListItemIcon>
            <ListItemText primary={route.label} />
          </ListItem>
        ))}
      </List>
    </div>
      {/* Contenido */}
      <main style={{ flex: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
