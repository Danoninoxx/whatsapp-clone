import Avatar from "@mui/material/Avatar";
import * as jose from 'jose';
/* eslint-disable react/prop-types */

const infoToken = jose.decodeJwt(sessionStorage.getItem('token'));
console.log(infoToken);
const UID = infoToken.sub;

function Chat({ chat, onSelectChat }) {
    return(
        <div className="chat-list">
          <div
            key={chat.id}
            className="chat-item"
            onClick={() => onSelectChat(chat)}
          >
            <div className="chat-container">
              {chat.avatar ? (
                <Avatar src={chat.avatar} alt={chat.name} />
              ) : (
                <Avatar>{chat.name.charAt(0).toUpperCase()}</Avatar>
              )}
  
              <div className="chat-info">
                <h4>{chat.name}</h4>
                <p>{chat.lastMessage}</p>
              </div>
            </div>
          </div>
      </div>
    )
}

export default Chat
export {UID}