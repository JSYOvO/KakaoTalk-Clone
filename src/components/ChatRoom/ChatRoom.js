import React, { useState, useEffect } from 'react';
import './ChatRoom.css';
import DetailChatRoom from '../DetailChatRoom/DetailChatRoom.js';
import { Avatar, Dialog } from '@material-ui/core';


function ChatRoom({id, chatWithEmail, chatWithProfileName, chatWithProfileUrl, chatWithStateMessage, timestamp, message, filterCondition}) {
    const [modalToggle, setModalToggle] = useState(false);
    const [showProfile, setShowProfile] = useState(true);
    const [detailChatRoomToggle, setDetailChatRoomToggle] = useState(false);

    useEffect(() => {
        if(filterCondition && (chatWithProfileName.indexOf((filterCondition)) >= 0)){
            setShowProfile(true);
        }
        else{
            if(!filterCondition) setShowProfile(true);
            else setShowProfile(false);
        }
        
    },[filterCondition])

    return (
        <>
            {showProfile &&
                <div className="chatroom" onClick={e => setDetailChatRoomToggle(true)}>
                    <Avatar src={chatWithProfileUrl} className="avatar" onClick ={e => setModalToggle(true)}/>
                    <div className="chatroom__userdata">
                        <h3>{chatWithProfileName}</h3>
                        <p>{message}</p>
                    </div>
                    {timestamp ? 
                        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
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
