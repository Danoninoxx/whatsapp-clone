/* eslint-disable react/prop-types */
import { useEffect } from "react";

function Message({ contenido, emisor, fecha, usuarioActual}) {
  const fechaObjeto = new Date(fecha);
  const fechaFormat = fechaObjeto.getHours()+":"+fechaObjeto.getMinutes().toString().padStart(2,"0");
  return (
    <div className={`message ${emisor === usuarioActual ? "emisor" : "receptor"}`}>
      <p className="contenido">{contenido}</p>
      <p className="fecha">{fechaFormat}</p>
    </div>
  );
}

export default Message;