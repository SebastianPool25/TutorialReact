/*Comentarios Iverson Gabriel Mex Pech*/

/*Index de importaciones*/

/*Importamos React*/
import React, { StrictMode } from "react";
/*Importamos la libreria para que React pueda comunicarse con el navegador*/
import { createRoot } from "react-dom/client";
/*Importamos la hoja de estilos del proyecto*/
import "./styles.css";
/*Usamos esta importación para relacionar el archivo App.js con el archivo index.js */
import App from "./App";

/*Creamos una constante para renderizar el proyecto*/
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);