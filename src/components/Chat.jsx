import Avatar from "@mui/material/Avatar";
import * as jose from 'jose';
/* eslint-disable react/prop-types */

const infoToken = jose.decodeJwt(sessionStorage.getItem('token'));
console.log(infoToken);

function Chat({ chat, onSelectChat }) {
    return(
        <div className="chat-list">
          <div
            key={chat.uid}
            className="chat-item"
            onClick={() => onSelectChat(chat)}
          >
            <div className="chat-container">
              {chat.img ? (
                <Avatar src={chat.img} alt={chat.nick} />
              ) : (
                <Avatar>{chat.nick.charAt(0).toUpperCase()}</Avatar>
              )}
  
              <div className="chat-info">
                <h4>{chat.nick}</h4>
              </div>
            </div>
          </div>
      </div>
    )
}

export default Chat