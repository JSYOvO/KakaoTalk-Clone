import React, { useState, useEffect } from 'react';
import './ChatRoom.css';
import { Avatar } from '@material-ui/core';

function ChatRoom({chatWithEmail, chatWithProfileName, chatWithProfileUrl, chatWithStateMessage, timestamp, message, filterCondition}) {
    const [modalToggle, setModalToggle] = useState(false);
    const [showProfile, setShowProfile] = useState(true);

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
                <div className="chatroom">
                    <Avatar src={chatWithProfileUrl} className="avatar" onClick={e => setModalToggle(true)}/>
                    <div className="chatroom__userdata">
                        <h3>{chatWithProfileName}</h3>
                        <p>{message}</p>
                    </div>
                    {timestamp ? 
                        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
                        : <small></small>}
                </div>
            }
        </>
        
    )
}

export default ChatRoom;
