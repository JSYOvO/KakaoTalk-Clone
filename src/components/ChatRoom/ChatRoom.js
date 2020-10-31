import React, { useState, useEffect } from 'react';
import './ChatRoom.css';
import DetailChatRoom from '../DetailChatRoom/DetailChatRoom.js';
import { Avatar, Dialog } from '@material-ui/core';


function ChatRoom({id, chatWithEmail, chatWithProfileName, chatWithProfileUrl, chatWithStateMessage, timestamp, message, filterCondition}) {

    const [detailChatRoomToggle, setDetailChatRoomToggle] = useState(false);
    const time = new Date(timestamp?.toDate());
    const timeToShowFormat = `${time.getMonth() < 10 ? `0${time.getMonth().toString()}` : time.getMonth().toString()}.${time.getDate() < 10 ? `0${time.getDate().toString()}` : time.getDate().toString()} ${time.getHours() < 10 ? `0${time.getHours().toString()}`:time.getHours().toString()}:${time.getMinutes() < 10 ? `0${time.getMinutes().toString()}` : time.getMinutes().toLocaleString()}`;
    let showProfile = false;

    if(filterCondition && (chatWithProfileName.indexOf((filterCondition)) >= 0)){
        showProfile = true;
    }
    else{
        if(!filterCondition) showProfile = true;
        else showProfile = false;
    }

    return (
        <>
            {showProfile &&
                <div className="chatroom" onClick={e => setDetailChatRoomToggle(true)}>
                    <Avatar src={chatWithProfileUrl} className="avatar" />
                    <div className="chatroom__userdata">
                        <h3>{chatWithProfileName}</h3>
                        <p>{message}</p>
                    </div>
                    {timestamp ? 
                        <small>{timeToShowFormat}</small>
                        : <small></small>}
                </div>
            }
            <Dialog open={detailChatRoomToggle} onClose={e => setDetailChatRoomToggle(false)} className="chatroom__datail">
                <DetailChatRoom
                    id={id}
                    email={chatWithEmail} 
                    name={chatWithProfileName} 
                    imageUrl={chatWithProfileUrl} 
                    statusMessage={chatWithStateMessage}
                    me={false}
                />
            </Dialog>
        </>
        
    )
}

export default ChatRoom;
