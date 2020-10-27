import { Avatar } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import MoodIcon from '@material-ui/icons/Mood';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import React, { useState } from 'react';
import './ChattingRoom.css';
import { db } from '../../firebase';

function ChattingRoom({email, name, imageUrl, statusMessage, me, filterText}) {
    
    const [chatMessage, setChatMessage] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();

        
    }
    return (
        <div className="chattingroom">
            <div className="chattingroom__header">
                <Avatar src={imageUrl} className="avatar" />
                <div className="userInfo">
                    <h3>{name}</h3>
                    <div className="userCnt">
                        <FaceIcon className="icon"/>
                        <small>2</small>
                    </div>
                </div>
            </div>
            <div className="chattingroom__main">

            </div>
            <div className="chattingroom__bottom">
                <div className="func">
                    <MoodIcon/>
                </div>
                <form className="messagebox">
                    <textarea type="text" value={chatMessage} onChange={e => setChatMessage(e.target.value)}/>
                    <button type="submit" onClick={handleSubmit}>전송</button>
                </form>
            </div>
        </div>
    )
}

export default ChattingRoom;
