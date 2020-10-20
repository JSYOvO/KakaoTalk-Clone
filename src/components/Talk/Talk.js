import React from 'react';
import './Talk.css';
import { Avatar } from '@material-ui/core';

function Talk({name, imageUrl, lastMessage, lastUpdataTime}) {
    return (
        <div className="talk">
            <Avatar className="avatar"/>
            <div className="talk__userdata">
                <h3>{name}</h3>
                <small>{lastMessage}</small>
            </div>
            <p>{lastUpdataTime}</p>
        </div>
    )
}

export default Talk;