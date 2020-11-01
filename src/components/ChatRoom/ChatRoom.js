import React, { useState, useEffect } from 'react';
import './ChatRoom.css';
import DetailChatRoom from '../DetailChatRoom/DetailChatRoom.js';
import { Avatar, Dialog } from '@material-ui/core';
import { db } from '../../firebase';


function ChatRoom({id, chatWithEmail, chatWithProfileName, chatWithProfileUrl, chatWithStateMessage, filterCondition}) {

    const [detailChatRoomToggle, setDetailChatRoomToggle] = useState(false);
    const [lastMessage, setLastMessage] = useState("");
    const [lastTimestamp, setLastTimestamp] = useState("");
    const [initializeToggle, setInitializeToggle] = useState(true);
    let showProfile = false;
    setTimeout(() => {
        setInitializeToggle(false);
    }, 1000)

    const updateLastStatue = () => {
        db.collection('chatRoom').doc(id).update({
            lastMessage: lastMessage,
            lastTimestamp: lastTimestamp
        })
    }
    
    if(filterCondition && (chatWithProfileName.indexOf((filterCondition)) >= 0)){
        showProfile = true;
    }
    else{
        if(!filterCondition) showProfile = true;
        else showProfile = false;
    }

    const setLastStatus = (value) => {     
        setLastMessage(value.lastMessage);
        setLastTimestamp(value.lastTimestamp);   
    }

    return (
        <>
            {showProfile &&
                <div className="chatroom" onClick={e => setDetailChatRoomToggle(true)}>
                    <Avatar src={chatWithProfileUrl} className="avatar" />
                    <div className="chatroom__userdata">
                        <h3>{chatWithProfileName}</h3>
                        <p>{lastMessage}</p>
                    </div>
                    {lastTimestamp ? 
                        <small>{lastTimestamp.slice(0, -3)}</small>
                        : <small></small>}
                </div>
            }
            <Dialog open={detailChatRoomToggle} onClose={e => setDetailChatRoomToggle(false), updateLastStatue} className="chatroom__datail">
                <DetailChatRoom
                    id={id}
                    email={chatWithEmail} 
                    name={chatWithProfileName} 
                    imageUrl={chatWithProfileUrl} 
                    statusMessage={chatWithStateMessage}
                    me={false}
                    setLastStatus={setLastStatus}
                />
            </Dialog>
            <Dialog open={initializeToggle} onClose={e => setInitializeToggle(false)} className="chatroom__datail_initialize">
                <DetailChatRoom
                    id={id}
                    email={chatWithEmail} 
                    name={chatWithProfileName} 
                    imageUrl={chatWithProfileUrl} 
                    statusMessage={chatWithStateMessage}
                    me={false}
                    setLastStatus={setLastStatus}
                />
            </Dialog>
            
        </>
        
    )
}

export default ChatRoom;
