import { useEffect, useState } from "react";
import Chat from "./Chat";
import * as jose from 'jose';

// eslint-disable-next-line react/prop-types
function ChatList({ onSelectChat }) {
  const [inputBuscar, setInputBuscar] = useState('');
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const infoToken = jose.decodeJwt(sessionStorage.getItem('token'));
    const UserID = infoToken.sub;
    const options = {
      method: 'GET',
      headers: {
        'User-Agent': 'insomnia/10.1.1',
        apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1ZG5jZWdnbHdlYWZvZmlwa3N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1MDMwNDEsImV4cCI6MjA0NDA3OTA0MX0.usSaU9Ff74UTnPVjExUs0t68TN1T98O97IcbrBLDQKw',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1ZG5jZWdnbHdlYWZvZmlwa3N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1MDMwNDEsImV4cCI6MjA0NDA3OTA0MX0.usSaU9Ff74UTnPVjExUs0t68TN1T98O97IcbrBLDQKw',
        Range: '0-9'
      }
    };

    const fetchChats = async () => {
      try {
        const response = await fetch(
          `https://zudncegglweafofipksu.supabase.co/rest/v1/contacto?seguidor=eq.${UserID}&select=id,contact`,
          options
        );
        const data = await response.json();

        // Array para almacenar los contactos
        const contacts = [];
        for (const e of data) {
          const userResponse = await fetch(
            `https://zudncegglweafofipksu.supabase.co/rest/v1/usuario?uid=eq.${e.contact}&select=*`,
            options
          );
          const userData = await userResponse.json();
          contacts.push(...userData);
        }
        setChats(contacts);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChats();
  }, []);

  return (
    <>
      <form id="chat-form-id">
        <input
          id="chat-input-id"
          onChange={(e) => setInputBuscar(e.target.value)}
          placeholder="Buscar..."
        />
      </form>
      <div className="chat-list">
        {chats
          .filter((c) => c.nick.toLowerCase().includes(inputBuscar.toLowerCase()))
          .map((c) => (
            <Chat key={c.uid} chat={c} onSelectChat={onSelectChat}></Chat>
          ))}
      </div>
    </>
  );
}

export default ChatList;
