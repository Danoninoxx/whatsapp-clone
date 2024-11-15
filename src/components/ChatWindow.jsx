import { useState } from "react";
import Message from "./Message";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Fab from "@mui/material/Fab";
import Avatar from "@mui/material/Avatar";
import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
/* eslint-disable react/prop-types */
// VARIABLES GLOBALES
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const apptitle = import.meta.env.VITE_TITLE;

const supabase = createClient(supabaseUrl, supabaseKey);

function ChatWindow({ selectedChat }) {
  const [messages, setMessages] = useState([
    { id: 1, text: "Mensaje de ejemplo!", sender: "Paco" },
    { id: 2, text: "Como estas?", sender: "You" },
  ]);

  const [newMessage, setNewMessage] = useState("");
  function subscribirseMensajes() {
    const canal = supabase
      .channel("tabla-mensajes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "mensajes" },
        (payload) => {
          const nuevoMensaje = payload.new;

          /*
          event:
          INSERT: Escucha cuando se insertan nuevas filas en la tabla.
          UPDATE: Escucha cuando se actualizan filas en la tabla.
          DELETE: Escucha cuando se eliminan filas de la tabla.
          *: Escucha todos los eventos (INSERT, UPDATE y DELETE).

          { event: "*", schema: "public", table: "mensajes", filter: "receptor=eq.usuario_id" },
          (payload) => {
            
          event:

En Supabase, el campo filter en las suscripciones en tiempo real utiliza operadores de filtro que permiten limitar los eventos en función de los valores de ciertas columnas. Aquí tienes un esquema de cómo se puede estructurar el campo filter:

arduino
Copiar código
"nombre_campo=operador.valor"
Partes del filtro:
nombre_campo: Especifica la columna de la tabla que quieres filtrar (por ejemplo, receptor).

        operador: Define el tipo de comparación que se hará en el filtro. Los operadores disponibles son:

        eq: Igual a (receptor=eq.usuario_id)
        neq: No igual a (receptor=neq.usuario_id)
        gt: Mayor que (receptor=gt.5)
        lt: Menor que (receptor=lt.10)
        gte: Mayor o igual a (receptor=gte.5)
        lte: Menor o igual a (receptor=lte.10)
        in: Dentro de una lista (receptor=in.(1,2,3))
        is: Es NULL o no es NULL (receptor=is.NULL)
        valor: Define el valor o valores a comparar (por ejemplo, usuario_id o NULL en algunos casos).

          */
          console.log(apptitle + "Nuevo mensaje:" + nuevoMensaje.cuerpo);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(canal);
    };
  }
  useEffect(subscribirseMensajes, []);
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: messages.length + 1, text: newMessage, sender: "You" },
      ]);
      setNewMessage("");
    }
  };

  if (!selectedChat) {
    return <div className="chat-window">Select a chat to start messaging</div>;
  }

  return (
    <div className="chat-window">
      <div className="chat-header">
        {selectedChat.avatar ? (
          <Avatar src={selectedChat.avatar} alt={selectedChat.name} />
        ) : (
          <Avatar>{selectedChat.name.charAt(0).toUpperCase()}</Avatar>
        )}

        <h3>{selectedChat.name}</h3>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <Message
            key={message.id}
            text={message.text}
            sender={message.sender}
          />
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <Fab variant="extended" onClick={handleSendMessage}>
          <SendIcon sx={{ color: "#005000" }} />
          Enviar
        </Fab>
        <Fab variant="extended">
          <AttachFileIcon sx={{ color: "#005000" }} />
        </Fab>
      </div>
    </div>
  );
}

export default ChatWindow;
