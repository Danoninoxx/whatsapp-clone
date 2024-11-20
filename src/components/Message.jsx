/* eslint-disable react/prop-types */

function Message({ contenido, emisor, fecha, usuarioActual,isGroup,nick}) {
  const fechaObjeto = new Date(fecha);
  const fechaFormat = fechaObjeto.getHours()+":"+fechaObjeto.getMinutes().toString().padStart(2,"0");
  if(!isGroup){
    return (
      <div className={`message ${emisor === usuarioActual ? "emisor" : "receptor"}`}>
        <p className="contenido">{contenido}</p>
        <p className="fecha">{fechaFormat}</p>
      </div>
    );
  }
  if(isGroup){
    return (
      <div className={`message ${emisor === usuarioActual ? "emisor" : "receptor"}`}>
        <p> {nick}</p>
        <p className="contenido">{contenido}</p>
        <p className="fecha">{fechaFormat}</p>
      </div>
    );
  }
  
}

export default Message;