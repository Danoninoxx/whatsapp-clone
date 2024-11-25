import { useState, useEffect } from "react";
import Message from "./Message";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Fab from "@mui/material/Fab";
import Avatar from "@mui/material/Avatar";
import { createClient } from "@supabase/supabase-js";
import * as jose from "jose";
/* eslint-disable react/prop-types */

// VARIABLES GLOBALES
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const infoToken = jose.decodeJwt(sessionStorage.getItem("token"));
const UserID = infoToken?.sub || ""; // ID del usuario autenticado

const supabase = createClient(supabaseUrl, supabaseKey);

function ChatWindow({ selectedChat }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  async function importarMensajes() {
      
    let { data} = await supabase
    .from('vmesagges5')
    .select('*')
    .or(
      selectedChat.grupo?`receptor.eq.${selectedChat.uid}`:`and(emisor.eq.${UserID},receptor.eq.${selectedChat.uid}),and(emisor.eq.${selectedChat.uid},receptor.eq.${UserID})`
    )
    .order("fecha", { ascending: true });
    setMessages(data);

  
  /*
  const { data:vmesagges5, error } = await supabase
    .from("vmessages5")
    .select("*")
    .or(
      `and(emisor.eq.${UserID},receptor.eq.${selectedChat.uid}),and(emisor.eq.${selectedChat.uid},receptor.eq.${UserID})`
    )
    .order("fecha", { ascending: true });

  if (error) {
    console.error("Error importando mensajes:", error.message);
  } else {
    setMessages(data);
  }
    */
  }

  // Función para suscribirse a nuevos mensajes en tiempo real
  function subscribirseMensajes() {
    const canal = supabase
      .channel("tabla-mensaje")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "mensaje" },
        (/*payload*/) => { importarMensajes();
          //const nuevoMensaje = payload.new;
          // Solo agregar el mensaje si es relevante para el chat actual
          /*if (
            (nuevoMensaje.emisor === UserID &&
              nuevoMensaje.receptor === selectedChat.uid) ||
            (nuevoMensaje.emisor === selectedChat.uid &&
              nuevoMensaje.receptor === UserID)
          ) {
            setMessages((prevMessages) => [...prevMessages, nuevoMensaje]);
          }*/
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }

  // Cargar mensajes al seleccionar un chat
  useEffect(() => {
    if (!selectedChat) return;

    

    importarMensajes();
    const unsubscribe = subscribirseMensajes();

    return () => unsubscribe();
  }, [selectedChat]);

  // Enviar un nuevo mensaje
  const enviarMensaje = async () => {
    if (newMessage.trim()) {
      const { error } = await supabase.from("mensaje").insert([
        {
          cuerpo: newMessage,
          emisor: UserID,
          receptor: selectedChat.uid, // El receptor es el usuario del chat seleccionado
        },
      ]);

      if (error) {
        console.error("Error enviando mensaje:", error.message);
      } else {
        setNewMessage("");
      }
    }
  };

  if (!selectedChat) {
    return (
      <div className="chat-window">
        Selecciona un chat para empezar a chatear
      </div>
    );
  }

  return (
    <div className="chat-window">
      {/* Encabezado del chat */}
      <div className="chat-header">
        {selectedChat.img ? (
          <Avatar src={selectedChat.img} alt={selectedChat.nick} />
        ) : (
          <Avatar>{selectedChat.nick?.charAt(0).toUpperCase()}</Avatar>
        )}
        <h3>{selectedChat.nick}</h3>
      </div>

      {/* Lista de mensajes */}
      <div className="messages">
        {messages.map((mensaje) => (
          <Message
            key={mensaje.id}
            contenido={mensaje.cuerpo}
            emisor={mensaje.emisor}
            fecha={mensaje.fecha}
            usuarioActual={UserID}
            isGroup={selectedChat.grupo}
            nick={mensaje.nick}
          />
        ))}
      </div>

      {/* Input para enviar mensajes */}
      <div className="input-box">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
        />
        <Fab variant="extended" onClick={enviarMensaje}>
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
