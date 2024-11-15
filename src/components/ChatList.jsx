import { useState } from "react";
import chats from "../mocks/chats";
import Chat from "./Chat";

/* mapea los chats que está en los mocks/chats.js y los muestra en la lista de chats  
debes pensar donde hacer el fetch, si pasarlo como props... pero no lo dejes como variable global
*/
/* eslint-disable react/prop-types */
function ChatList({ onSelectChat }) {
  const [inputBuscar, setInputBuscar] = useState('');

  return (
    <>
      <form id="chat-form-id">
        <input id="chat-input-id" onChange={(e)=>{setInputBuscar(e.target.value)}} placeholder="Buscar..."></input>
      </form>
      <div className="chat-list">
        {chats.filter((c)=>c.name.toLowerCase().includes(inputBuscar.toLowerCase())).map((c)=>(
          <Chat key={c.id} chat={c} onSelectChat={onSelectChat}></Chat>
        ))}
      </div>
    </>
  );
}

export default ChatList;
