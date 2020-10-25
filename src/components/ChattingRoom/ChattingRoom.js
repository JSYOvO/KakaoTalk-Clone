import { Avatar } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import MoodIcon from '@material-ui/icons/Mood';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import React from 'react';
import './ChattingRoom.css';

function ChattingRoom({email, name, imageUrl, statusMessage, me, filterText}) {
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
                <div className="messagebox">
                    <input type="text"/>
                    <button>전송</button>
                </div>
            </div>
        </div>
    )
}

export default ChattingRoom;
